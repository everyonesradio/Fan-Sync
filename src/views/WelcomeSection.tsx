import React from "react";
import Image from "next/image";

const WelcomeSection = () => {
  return (
    <div className="snap-start w-screen h-screen flex items-center justify-center text-8xl">
      <div className="section h-screen w-full flex items-center overflow-hidden relative">
        <h1 className="relative ml-40 z-10 text-[#100D03] text-left text-5xl left-0 top-0 flex w-full justify-start italic font-bold lg:static lg:w-auto lg:rounded-xl lg:p-4">
          MEET SGaWD...
        </h1>
        <Image src={'/images/sgawd-banner.jpg'} alt='Welcome Banner' fill={true} className='relative object-cover object-center w-full h-full'/>
      </div>
    </div>
  );
};

export default WelcomeSection;