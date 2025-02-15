// ** React/Next.js Imports
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

// ** React95 Imports
import { Input, List, Button } from "@react95/core";

// ** Custom Components, Hooks, Utils, etc.
import MediaPlayer from "@/components/media-player";
import { useLicense } from "@/context/LicenseContext";
import { useSpotify } from "@/context/SpotifyContext";
import type { Catalog } from "@/types/catalog";
import { api } from "@/utils/trpc";
import { upperCase } from "@/utils/upper-case";

/**
 * The `Anthem` component allows users to search for and select an anthem from a catalog of songs.
 * It provides a search input to filter songs by name or album name, displays the search results,
 * and allows users to select a song as their anthem. Once a song is selected, it can be played
 * using the MediaPlayer component. The selected anthem can be submitted, which triggers an update
 * to the user's profile and navigates to the signature page.
 *
 * Features:
 * - Search for songs by name or album name.
 * - Display search results with album cover images.
 * - Select a song as an anthem.
 * - Play the selected anthem using the MediaPlayer component.
 * - Submit the selected anthem to update the user's profile.
 * - Custom hooks and utilities for context and API interactions.
 */

const Anthem: React.FC = () => {
  const router = useRouter();
  const { licenseID } = useLicense();
  const { artistCatalog } = useSpotify();
  const { mutateAsync: updateAnthem } = api.fans.anthem.useMutation();

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Catalog[]>([]);
  const [selectedAnthem, setSelectedAnthem] = useState<Catalog | null>(null);

  useEffect(() => {
    const originalAlbums = artistCatalog.items;
    // Filter the original albums based on the search query
    if (searchQuery) {
      const filteredResults = originalAlbums.filter(
        (result) =>
          result.album_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          result.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filteredResults);
    } else {
      setSearchResults(originalAlbums); // reset the search results to the original list
    }
  }, [artistCatalog, searchQuery]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
  };

  const handleSubmit = async () => {
    if (!selectedAnthem) {
      alert("Please select an anthem first.");
      return;
    }

    try {
      const data = await updateAnthem({
        uuid: licenseID!,
        anthem: selectedAnthem,
      });

      if (!data) {
        throw new Error("Failed to save anthem");
      }

      router.push("/signature");
    } catch (error) {
      console.error("Error saving anthem:", error);
      alert("Failed to save anthem. Please try again.");
    }
  };

  return (
    <div className='min-h-screen flex flex-col bg-black items-center justify-center'>
      <h1 className='font-bold text-3xl sm:text-5xl text-center text-white p-8'>
        Choose Your SGaWD Anthem
      </h1>
      <div className='relative mb-4'>
        <Input
          placeholder='Search your favorite SGaWD song'
          value={searchQuery}
          style={{
            width: "min(80vw, 460px)",
            height: "min(32px, 48px)",
            paddingLeft: "8px",
            paddingRight: "8px",
          }}
          onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter") {
              handleSearch(e as unknown as React.ChangeEvent<HTMLInputElement>);
            }
          }}
          onChange={handleSearch}
        />
        {searchQuery && (
          <div className='absolute w-full max-h-64 overflow-auto scrollbar-hide mt-4 z-50'>
            <List style={{ width: "min(80vw, 460px)", margin: "0 auto" }}>
              {searchResults.length > 0 ? (
                searchResults.map((item, index) => (
                  <React.Fragment key={item.id}>
                    <List.Item
                      icon={
                        <Image
                          alt='Album Cover'
                          src={item.images[0].url}
                          width={40}
                          height={40}
                        />
                      }
                      onClick={() => {
                        setSelectedAnthem(item);
                        setSearchQuery("");
                      }}
                    >
                      <div className='flex flex-col items-start font-bold pl-2'>
                        <span>{item.name}</span>
                        <span>
                          {upperCase(item.album_type)} -{" "}
                          {item.release_date.split("-")[0]}
                        </span>
                      </div>
                    </List.Item>
                    {index !== searchResults.length - 1 && <List.Divider />}
                  </React.Fragment>
                ))
              ) : (
                <div className='p-4 text-center text-gray-500'>
                  Item not found
                </div>
              )}
            </List>
          </div>
        )}
      </div>
      <div className='flex flex-col items-center justify-center p-8'>
        {selectedAnthem && <MediaPlayer selectedAnthem={selectedAnthem} />}
      </div>
      <Button className='hover:bg-slate-300' onClick={handleSubmit}>
        Next
      </Button>
    </div>
  );
};

export default Anthem;
