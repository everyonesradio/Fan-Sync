import React, { useEffect, useState } from "react";

import { Input } from "@react95/core";

import type { Catalog } from "@/types/catalog";

import TrackList from "./TrackList";

interface Props {
  initialItems?: Catalog[];
  onTrackSelect: (track: Catalog) => void;
}

const SearchModal: React.FC<Props> = ({ initialItems = [], onTrackSelect }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Catalog[]>([]);

  useEffect(() => {
    const originalAlbums = initialItems;
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
  }, [initialItems, searchQuery]);
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
  };

  return (
    <div className='w-full'>
      <Input
        placeholder='Search your favorite SGaWD song'
        value={searchQuery}
        onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === "Enter") {
            handleSearch(e as unknown as React.ChangeEvent<HTMLInputElement>);
          }
        }}
        onChange={handleSearch}
        className='w-full'
      />
      {searchQuery && (
        <div className='max-w-full max-h-64 overflow-auto'>
          <TrackList
            tracks={searchResults}
            selectedTrack={null}
            onTrackSelect={onTrackSelect}
          />
        </div>
      )}
    </div>
  );
};

export default SearchModal;
