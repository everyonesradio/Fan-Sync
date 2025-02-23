"use client";

import Image from "next/image";

import type { Catalog } from "@/types/catalog";
import { upperCase } from "@/utils/upper-case";
import { cn } from "@lib/utils";

interface Props {
  track: Catalog;
  onSelect: (track: Catalog) => void;
  isSelected?: boolean;
  className?: string;
}

const TrackItem: React.FC<Props> = ({
  track,
  onSelect,
  // isSelected,
  className,
}) => {
  if (!track) {
    return null;
  }

  return (
    <div
      onClick={() => onSelect(track)}
      className={cn(
        "w-full px-4 py-3 cursor-pointer",
        "transition-all duration-150",
        "bg-background",
        // {
        //   // Default state
        //   "hover:bg-[#000080]/5": !isSelected,
        //   "active:bg-[#000080]/10": !isSelected,

        //   // Selected state
        //   "bg-[#000080] text-white": isSelected,
        //   "hover:bg-[#000080]/90": isSelected,
        //   "shadow-sm": isSelected,
        // },
        className
      )}
    >
      <div className='flex items-center gap-4 w-full'>
        <div
          className={cn(
            "relative flex-shrink-0 w-[60px] h-[60px]",
            "border-2",
            "transition-colors duration-150",
            // {
            //   "border-white/30": isSelected,
            //   "border-gray-300 group-hover:border-[#000080]/30": !isSelected,
            // },
            "shadow-sm"
          )}
        >
          <Image
            alt={`${track.name} Album Cover`}
            src={track.images[0]?.url || "/default-album.png"}
            fill
            className='object-cover'
          />
        </div>
        <div className='flex flex-col min-w-0 flex-1 gap-1'>
          <h4
            className={cn(
              "font-ms-sans text-lg leading-tight tracking-tight truncate"
              // isSelected
              //   ? "text-white font-bold"
              //   : "text-gray-900 font-semibold"
            )}
          >
            {track.name}
          </h4>
          <span
            className={cn(
              "text-sm font-ms-sans"
              // isSelected ? "text-white/80" : "text-gray-600"
            )}
          >
            {upperCase(track.album_type)} • {track.release_date.split("-")[0]}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TrackItem;
