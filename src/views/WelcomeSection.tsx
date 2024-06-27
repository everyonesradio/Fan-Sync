import React from "react";
import Image from "next/image";

const WelcomeSection = () => {
  return (
    <div className='snap-start w-screen h-screen flex flex-col items-center justify-end text-8xl'>
      <div className='section h-screen w-full flex items-center overflow-hidden relative'>
      <Image
          src={"/images/sgawd-banner.jpg"}
          alt='Welcome Banner'
          layout="fill"
          objectFit="cover"
          className='absolute inset-0 w-full h-full object-cover'
        />
        <h1 className='relative ml-40 z-10 text-[#100D03] text-left text-5xl left-0 top-0 flex w-full justify-start italic font-bold lg:static lg:w-auto lg:rounded-xl lg:p-4'>
          MEET SGaWD...
        </h1>
        {/*<div className='bg-green-500 z-10 p-4 mt-4 w-full text-white text-xl font-semibold'>
          Scrollable Content Here
        </div>*/}
      </div>
    </div>
  );
};

export default WelcomeSection;