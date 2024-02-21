import React, { useState, useEffect } from "react";
import { ArtistCatalog, Album  } from "@/types/catalog";
import { Input, List, Button } from "@react95/core";
import Image from "next/image";

type SpotifyAnthemProps = {
  artistCatalog: ArtistCatalog;
};

const SpotifyAnthem: React.FC<SpotifyAnthemProps>  = ({ artistCatalog }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [originalAlbums, setOriginalAlbums] = useState<Album[]>([]);
  const [searchResults, setSearchResults] = useState<Album[]>([]);

  useEffect(() => {
    setOriginalAlbums(artistCatalog.items);
    // console.log(artistCatalog.items)
  }, [artistCatalog]);

  useEffect(() => {
    // Filter the original albums based on the search query
    if (searchQuery) {
      const filteredResults = originalAlbums.filter((result) =>
        result.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filteredResults);
    } else {
      setSearchResults(originalAlbums); // reset the search results to the original list
    }
  }, [searchQuery, originalAlbums]); 

  const handleSearch = (e: any) => {
    const query = e.target.value;
    setSearchQuery(query);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
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
                    <List.Item icon={<Image alt="" src={item.images[0].url} width={40} height={40} />}>
                      <div className="flex flex-col items-start font-bold pl-2">
                        <span>{item.name}</span>
                        <span>{item.album_type} - {item.release_date}</span>
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
    </div>
  );
};

export default SpotifyAnthem;