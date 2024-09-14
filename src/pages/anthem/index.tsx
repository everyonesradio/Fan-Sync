// ** React/Next.js Imports
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

// ** React95 Imports
import { Input, List, Button } from "@react95/core";

// ** Custom Components, Hooks, Utils, etc.
import { useSpotify } from "@/context/SpotifyContext";
import { useLicense } from "@/context/LicenseContext";
import MediaPlayer from "@/components/MediaPlayer";
import { Catalog } from "@/types/catalog";
import { upperCase } from "@/utils/upper-case";
import { api } from "@/utils/trpc";

const Anthem: React.FC = () => {
  const router = useRouter();
  const { licenseID } = useLicense();
  const { artistCatalog } = useSpotify();
  const { mutateAsync: updateAnthem } = api.fans.anthem.useMutation();

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Catalog[]>([]);
  const [selectedAnthem, setSelectedAnthem] = useState<any>(null);
  
  useEffect(() => {
    const originalAlbums = artistCatalog.items;
    //const uniqueSongs = handleSearch();
    // Filter the original albums based on the search query
    if (searchQuery) {
      // Filter results based on album name or song name
      const filteredResults = originalAlbums.filter((result) =>
        result.album_name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        result.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filteredResults);
      // remove duplicate songs

     /* if (filteredResults[0]?.name == uniqueSongs.values().next().value.name) {
        const artistTracks = filteredResults.filter((track)) => 
          track.name.toLowerCase().includes(searchQuery.toLowerCase());
      
      }*/
    } else {
      setSearchResults(originalAlbums); // reset the search results to the original list
    }
  }, [artistCatalog, searchQuery]);
  

  const handleSubmit = async () => {
    if (!selectedAnthem) {
      alert("Please select an anthem first.");
      return;
    }

    try {
      const data = await updateAnthem({ 
        uuid: licenseID!, 
        anthem: selectedAnthem 
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
      <h1 className='font-bold text-5xl text-center text-white p-8'>
        Choose Your SGaWD Anthem
      </h1>
      <div className='mb-4'>
        <Input
          placeholder='Your Anthem'
          value={searchQuery}
          onKeyDown={(e: any) => {
            if (e.key == "Enter") {
              //handleSearch();
            }
          }}
          //onChange={handleKeyDown}
          className='mb-4 w-72'
        />
        <Button
          //onClick={handleSearch}
          className='hover:bg-slate-300 ml-1'
          style={{
            boxShadow: "none",
            paddingTop: "3px",
            paddingBottom: "6px",
          }}
        >
          Search
        </Button>
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
                          {upperCase(item.album_type)} - {""}
                          {upperCase(item.album_name)} {""}
                        </span>
                        <span>
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
