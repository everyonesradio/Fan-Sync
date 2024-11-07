// ** React/Next.js Imports
import Image from "next/image";
import React, { useEffect, useRef } from "react";

// ** Custom Components, Hooks, Utils, etc.
import type { Catalog } from "@/types/catalog";
import { upperCase } from "@/utils/upper-case";

type MediaPlayerProps = {
  selectedAnthem: Catalog;
};

const MediaPlayer: React.FC<MediaPlayerProps> = ({ selectedAnthem }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audioElement = selectedAnthem?.preview_url
      ? new Audio(selectedAnthem.preview_url)
      : null;

    // Play the audio automatically
    if (audioElement && selectedAnthem?.preview_url) {
      audioElement.play();
    }

    // Optional: Handle what happens after the audio ends
    const handleAudioEnded = () => {
      console.log("Audio ended");
    };

    // Use the captured value in the cleanup function
    return () => {
      if (audioElement) {
        audioElement.pause();
        audioElement.removeEventListener("ended", handleAudioEnded);
      }
    };
  }, [selectedAnthem]); // Ensure dependencies are correctly listed

  return (
    <div className='max-w-sm rounded overflow-hidden shadow-lg m-4 bg-white'>
      <div className='relative w-full h-48'>
<Image
        className='w-full h-full object-cover'
        src={selectedAnthem.images[0].url}
        alt='Album Cover'
        width={200}
        height={200}
layout="fill"
      />
</div>
      <div className='px-6 py-4'>
        <div className='font-bold text-xl mb-2'>{selectedAnthem.name}</div>
        <p className='text-gray-700 text-base'>
          {upperCase(selectedAnthem.album_type)} -
          {selectedAnthem.release_date.split("-")[0]}
        </p>
        {selectedAnthem.preview_url && (
          <audio ref={audioRef} style={{ display: "none" }}>
            <source src={selectedAnthem.preview_url} type='audio/mpeg' />
            <track kind='captions' src='' label='English captions' />
          </audio>
        )}
      </div>
    </div>
  );
};

export default MediaPlayer;
