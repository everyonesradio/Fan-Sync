// ** React/Next.js Imports
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

// ** React95 Imports
import { Input, List, Button } from "@react95/core";
import { SccviewIcon } from "@react95/icons";

// ** Custom Components, Hooks, Utils, etc.
import MediaPlayer from "@/components/MediaPlayer";
import { useLicense } from "@/context/LicenseContext";
import { useSpotify } from "@/context/SpotifyContext";
import type { Catalog } from "@/types/catalog";
import { api } from "@/utils/trpc";
import { upperCase } from "@/utils/upper-case";

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
      <div className='mb-4'>
        <div className='relative mb-4'>
          <Input
            placeholder='Your Anthem'
            value={searchQuery}
            onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === "Enter") {
                handleSearch(
                  e as unknown as React.ChangeEvent<HTMLInputElement>
                );
              }
            }}
            onChange={handleSearch}
          />
          <div className='absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none'>
            <SccviewIcon variant='16x16_4' />
          </div>
        </div>
        {searchQuery && (
          <div className='max-h-64 overflow-auto scrollbar-hide mt-2 p-1'>
            <List>
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
      {selectedAnthem && <MediaPlayer selectedAnthem={selectedAnthem} />}
      <Button className='hover:bg-slate-300' onClick={handleSubmit}>
        Next
      </Button>
    </div>
  );
};

export default Anthem;
