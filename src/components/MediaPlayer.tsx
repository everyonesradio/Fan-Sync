// ** React/Next.js Imports
import React, { useEffect, useRef } from "react";
import Image from "next/image";

// ** Util Imports
import { upperCase } from '@/util/upper-case';

// ** Types
import { Catalog } from "@/types/catalog";

type MediaPlayerProps = {
  selectedAnthem: Catalog;
};

const MediaPlayer: React.FC<MediaPlayerProps> = ({ selectedAnthem }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  console.log(selectedAnthem);

  useEffect(() => {
    // Capture the current value of the ref
    let audioElement = audioRef.current;
  
    // Check if the audio element is available and not null
    if (audioElement && selectedAnthem?.preview_url) {
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
        audioElement.removeEventListener('ended', handleAudioEnded);
      }
    };
  }, [selectedAnthem]); // Ensure dependencies are correctly listed

  return (
    <div className='max-w-sm rounded overflow-hidden shadow-lg m-4 bg-white'>
      <Image
        className='w-full'
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
        {/* Audio Playback: Flagged for now
        <audio ref={audioRef} style={{ display: 'none' }}>
          <source src={selectedAnthem.preview_url} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio> */}
      </div>
    </div>
  );
};

export default MediaPlayer;
