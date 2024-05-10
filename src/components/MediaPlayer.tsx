import React from "react";
import Image from "next/image";
import { upperCase } from '@/util/upper-case';
import { Catalog } from "@/types/catalog";

type MediaPlayerProps = {
  selectedAnthem: Catalog;
};

const MediaPlayer: React.FC<MediaPlayerProps> = ({ selectedAnthem }) => {
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
      </div>
    </div>
  );
};

export default MediaPlayer;
