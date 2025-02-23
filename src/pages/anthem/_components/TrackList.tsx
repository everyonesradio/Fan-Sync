"use client";

import React from "react";


import type { Catalog } from "@/types/catalog";
import { cn } from "@lib/utils";

import TrackItem from "./TrackItem";

interface Props {
  tracks: Catalog[];
  selectedTrack: Catalog | null;
  onTrackSelect: (track: Catalog) => void;
}

const TrackList: React.FC<Props> = ({
  tracks,
  selectedTrack,
  onTrackSelect,
}) => {
  if (!tracks?.length) {
    return (
      <div className='p-4 text-center text-gray-500'>No tracks available</div>
    );
  }

  return (
    <div className='flex flex-col divide-y divide-gray-200 h-full w-full min-h-0 overflow-y-auto'>
      {tracks.map((item) => (
        <TrackItem
          key={item.id}
          track={item}
          onSelect={onTrackSelect}
          isSelected={selectedTrack?.id === item.id}
          className={cn(
            "transition-colors duration-200 hover:bg-[#000080]/80 hover:text-white cursor-pointer ",
            selectedTrack?.id === item.id && "bg-[#000080] text-white"
          )}
        />
      ))}
    </div>
  );
};

export default TrackList;
