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

    console.log("Audio element:", audioElement);

    // Check if the audio element is available and not null
    if (audioElement && selectedAnthem?.preview_url) {
      console.log("Audio element:", audioElement);
      // Play the audio automatically
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
      <Image
        className='w-full h-64 object-cover object-center'
        src={selectedAnthem.images[0].url}
        alt='Album Cover'
        width={100}
        height={100}
      />
      <div className='px-6 py-4'>
        <div className='font-bold text-xl mb-2'>{selectedAnthem.name}</div>
        <p className='text-gray-700 text-base'>
          {upperCase(selectedAnthem.album_type)} -{" "}
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
