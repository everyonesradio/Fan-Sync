// ** React/Next.js Imports
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
// ** Custom Components
import { useSpotify } from "@/context/SpotifyContext";
import { useLicense } from "@/context/LicenseContext";
import MediaPlayer from "@/components/MediaPlayer";
// ** Third-Party Imports
import { Input, List, Button } from "@react95/core";
// ** Util Imports
import { upperCase } from "@/util/upper-case";
// ** Types
import { Catalog } from "@/types/catalog";

const Anthem: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Catalog[]>([]);
  const [selectedAnthem, setSelectedAnthem] = useState<Catalog | null>(null);
  const { artistCatalog } = useSpotify();
  const { licenseID } = useLicense();
  const router = useRouter();

  const handleKeyDown = (event: any) => {
    const query = event.target.value;
    setSearchQuery(query);
  };

  const handleSearch = () => {
    const originalAlbums = artistCatalog.items;
    //const searchQuery = userSearch;
    //remove duplicate songs
    const songName = new Set();
    originalAlbums.forEach((track) => {
      if(!songName.has(track.name) && track.album_type === "album"){ 
        songName.add(track);
      }
    });
    //const uniqueSongs = [...songName];
    //console.log("uniqueSongs:", uniqueSongs);
    return songName;
    // Filter the original albums based on the search query
  };

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
  

  const handleNext = async () => {
    if (!selectedAnthem) {
      alert("Please select an anthem first.");
      return;
    }

    try {
      const data = await fetch("/api/updateAnthem", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ licenseID, selectedAnthem }),
      });

      if (!data.ok) {
        throw new Error("Failed to save anthem");
      }

      await data.json();
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
              handleSearch();
            }
          }}
          onChange={handleKeyDown}
          className='mb-4 w-72'
        />
        <Button
          onClick={handleSearch}
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
      <Button className='hover:bg-slate-300' onClick={handleNext}>
        Next
      </Button>
    </div>
  );
};

export default Anthem;
