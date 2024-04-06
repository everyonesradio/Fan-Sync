import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArtistCatalog, Album } from "@/types/catalog";
import { Input, List, Button } from "@react95/core";
import MediaPlayer from "@/components/MediaPlayer";

type SpotifyAnthemProps = {
  artistCatalog: ArtistCatalog;
};

const SpotifyAnthem: React.FC<SpotifyAnthemProps>  = ({ artistCatalog }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Album[]>([]);
  const [selectedAnthem, setSelectedAnthem] = useState<Album | null>(null);
  const router = useRouter();

  useEffect(() => {
    const originalAlbums = artistCatalog.items;
    // Filter the original albums based on the search query
    if (searchQuery) {
      const filteredResults = originalAlbums.filter((result) =>
        result.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filteredResults);
    } else {
      setSearchResults(originalAlbums); // reset the search results to the original list
    }
  }, [artistCatalog, searchQuery]); 

  const handleSearch = (e: any) => {
    const query = e.target.value;
    setSearchQuery(query);
  };

  const upperCase = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="font-bold text-5xl text-center p-8">Choose Your SGaWD Anthem</h1>
      <div >
        <Input   
          placeholder="Your Anthem"
          value={searchQuery}
          onKeyPress={(e: any) => {if (e.key == "Enter") {handleSearch(e)}}}
          onChange={handleSearch}
          className="mb-4"
        />
        <Button onClick={handleSearch} className="mb-4">Search</Button>
        {searchQuery && (
          <div className="max-h-64 overflow-auto scrollbar-hide">
            <List>
              {searchResults.length >  0 ? (
                searchResults.map((item, index) => (
                  <React.Fragment key={item.id}>
                    <List.Item 
                      icon={<Image alt="Album Cover" src={item.images[0].url} width={40} height={40} />}
                      onClick={() => {
                        setSelectedAnthem(item)
                        setSearchQuery('');
                      }}
                    >
                      <div className="flex flex-col items-start font-bold pl-2">
                        <span>{item.name}</span>
                        <span>{upperCase(item.album_type)} - {item.release_date.split('-')[0]}</span>
                      </div>
                    </List.Item>
                    {index !== searchResults.length -   1 && <List.Divider />}
                  </React.Fragment>
                ))
              ) : (
                <div className="p-4 text-center text-gray-500">
                  Item not found
                </div>
              )}
            </List>
          </div>
        )}
      </div>
      {selectedAnthem && <MediaPlayer selectedAnthem={selectedAnthem} />}
      <Button onClick={() => router.push('/license')}>Next</Button>
    </div>
  );
};

export default SpotifyAnthem;