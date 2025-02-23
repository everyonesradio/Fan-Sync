"use client";

import { useState, useEffect } from "react";

import { Tab, Tabs } from "@react95/core";

import type { Catalog } from "@/types/catalog";
import { cn } from "@lib/utils";

import SearchModal from "./SearchModal";
import TrackList from "./TrackList";

interface Props {
  tracks: Catalog[];
  className?: string;
  selectedTrack: Catalog | null;
  setSelectedTrack: (track: Catalog) => void;
}

const AnthemSelection: React.FC<Props> = ({
  tracks,
  className,
  selectedTrack,
  setSelectedTrack,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div
      className={cn("flex flex-col h-full w-full overflow-hidden", className)}
    >
      <Tabs
        defaultActiveTab='For You'
        style={{
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          borderBottom: "1px solid #000080",
          borderRadius: "0 0 10px 10px",
          backgroundColor: "#f0f0f0",
          border: "1px solid #000080",
        }}
      >
        <Tab
          title='For You'
          className={cn(
            "w-full font-ms-sans text-lg font-bold px-6 py-2",
            "hover:bg-[#000080]/50 hover:text-white",
            "data-[active=true]:bg-[#000080]",
            "data-[active=true]:text-white",
            "cursor-pointer"
          )}
        >
          <div className='w-full max-h-[500px] h-full overflow-y-auto'>
            {tracks && (
              <TrackList
                tracks={[...tracks]
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .slice(0, 4)}
                selectedTrack={selectedTrack}
                onTrackSelect={setSelectedTrack}
              />
            )}
          </div>
        </Tab>
        <Tab
          title='Recent'
          activeTab=''
          className={cn(
            "w-full font-ms-sans text-lg font-bold px-6 py-2",
            "hover:bg-[#000080]/50 hover:text-white",
            "data-[active=true]:bg-[#000080]",
            "data-[active=true]:text-white",
            "cursor-pointer"
          )}
        >
          <div className='w-full max-h-[500px] h-full overflow-y-auto'>
            {tracks && (
              <TrackList
                tracks={[...tracks].sort(
                  (a, b) =>
                    new Date(b.release_date).getTime() -
                    new Date(a.release_date).getTime()
                )}
                selectedTrack={selectedTrack}
                onTrackSelect={setSelectedTrack}
              />
            )}
          </div>
        </Tab>
        <Tab
          title='All'
          className={cn(
            "w-full font-ms-sans text-lg font-bold px-6 py-2",
            "hover:bg-[#000080]/50 hover:text-white",
            "data-[active=true]:bg-[#000080]",
            "data-[active=true]:text-white",
            "cursor-pointer"
          )}
        >
          <div className='w-full max-h-[500px] h-full overflow-y-auto'>
            {tracks && (
              <TrackList
                tracks={tracks.sort((a, b) => a.name.localeCompare(b.name))}
                selectedTrack={selectedTrack}
                onTrackSelect={setSelectedTrack}
              />
            )}
          </div>
        </Tab>
        <Tab
          title='Search'
          className={cn(
            "w-full font-ms-sans text-lg font-bold px-6 py-2",
            "hover:bg-[#000080]/50 hover:text-white",
            "data-[active=true]:bg-[#000080]",
            "data-[active=true]:text-white",
            "cursor-pointer"
          )}
        >
          <div className='w-full max-h-[500px] h-full overflow-y-auto'>
            <SearchModal
              initialItems={tracks}
              onTrackSelect={setSelectedTrack}
            />
          </div>
        </Tab>
      </Tabs>
    </div>
  );
};

export default AnthemSelection;
