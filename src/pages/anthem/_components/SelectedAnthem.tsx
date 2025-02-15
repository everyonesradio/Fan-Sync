"use client";

import Image from "next/image";

import { Button, Frame } from "@react95/core";

import type { Catalog } from "@/types/catalog";

interface Props {
  track?: Catalog | null;
  onConfirm?: () => void;
  onClear?: () => void;
}

const SelectedAnthem: React.FC<Props> = ({ track, onConfirm, onClear }) => {
  const AnthemButtons = () => {
    return (
      <div className='w-full flex items-center justify-end gap-2'>
        <Button
          className='hover:bg-slate-300 min-w-[100px] flex-1 w-full'
          onClick={onClear}
          disabled={!track}
        >
          Clear
        </Button>
        <Button
          className='hover:bg-slate-300 min-w-[100px] !bg-[#000080] !text-white flex-1 w-full'
          onClick={onConfirm}
          disabled={!track}
        >
          Confirm
        </Button>
      </div>
    );
  };

  return (
    <div className='fixed bottom-0 left-0 right-0 z-50 animate-slide-up'>
      <Frame
        className='flex flex-col w-full p-6 gap-4 bg-[#c3c3c3] border-t-4 border-[#000080] shadow-lg'
        style={{
          backgroundImage:
            "linear-gradient(45deg, #c3c3c3 25%, #d4d4d4 25%, #d4d4d4 50%, #c3c3c3 50%, #c3c3c3 75%, #d4d4d4 75%, #d4d4d4 100%)",
          backgroundSize: "56.57px 56.57px",
        }}
      >
        <div className='flex gap-6 items-center'>
          {track ? (
            <>
              <div className='relative w-[120px] h-[120px] border-4 border-[#000080] shadow-lg'>
                <Image
                  src={track.images[0].url}
                  alt={track.album_name}
                  fill
                  className='object-cover'
                />
              </div>
              <div className='flex-1'>
                <h3 className='text-2xl font-bold text-[#000080] mb-2'>
                  {track.name}
                </h3>
                <p className='text-lg text-gray-700'>Selected as anthem</p>
              </div>
            </>
          ) : (
            <p className='w-full text-center text-lg'>No anthem selected</p>
          )}
        </div>
        <div className='h-px bg-gradient-to-r from-transparent via-[#000080] to-transparent my-2' />
        <AnthemButtons />
      </Frame>
    </div>
  );
};

export default SelectedAnthem;
