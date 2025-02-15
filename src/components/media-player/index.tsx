/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */

// ** React/Next.js Imports
import Image from "next/image";
import React, { useEffect } from "react";

// ** Third-Party Imports
import { Howl } from "howler";

// ** Custom Components, Hooks, Utils, etc.
import type { Catalog } from "@/types/catalog";
import { upperCase } from "@/utils/upper-case";

type MediaPlayerProps = {
  selectedAnthem: Catalog;
};

/**
 * The `MediaPlayer` component displays the selected anthem's album cover, name, and release date.
 * The component also handles audio using the Howler library.
 *
 * @param selectedAnthem - The selected anthem object, which contains the necessary data to render the media player.
 * @returns A React component that displays the media player.
 */

const MediaPlayer: React.FC<MediaPlayerProps> = ({ selectedAnthem }) => {
  useEffect(() => {
    if (selectedAnthem?.preview_url) {
      const sound = new Howl({
        src: [selectedAnthem.preview_url],
        volume: 0,
        html5: true,
        onend: () => {
          console.log("Audio playback completed");
        },
      });

      // Play and fade in
      sound.play();
      sound.fade(0, 1, 500);

      // Cleanup function
      return () => {
        sound.fade(1, 0, 300);
        setTimeout(() => {
          sound.unload();
        }, 300);
      };
    }
  }, [selectedAnthem]);

  return (
    <div className='w-full bg-white z-10'>
      <div>
        <Image
          className='w-full h-full object-cover'
          src={selectedAnthem.images[0]?.url}
          alt='Album Cover'
          width={200}
          height={200}
        />
      </div>
      <div className='px-6 py-4'>
        <div className='font-bold text-xl mb-2 max-w-[300px]'>
          {selectedAnthem.name}
        </div>
        <p className='text-gray-700 text-base'>
          {upperCase(selectedAnthem.album_type)} -{" "}
          {selectedAnthem.release_date.split("-")[0]}
        </p>
      </div>
    </div>
  );
};

export default MediaPlayer;
