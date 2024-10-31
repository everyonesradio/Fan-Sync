// ** React/Next.js Imports
import Image from "next/image";
import React from "react";

const WelcomeSection = () => {
  return (
    <div className='snap-start w-screen h-screen flex flex-col items-center justify-end'>
      <div className='section h-screen w-full flex items-center overflow-hidden relative'>
        <Image
          src={"/images/sgawd-banner.jpg"}
          alt='Welcome Banner'
          fill={true}
          style={{
            objectFit: "cover",
          }}
          className='absolute inset-0 w-full h-full object-cover'
        />
        <h1 className='flex w-full justify-start italic font-bold z-10 text-3xl text-white ml-4 sm:text-5xl sm:text-[#100D03] sm:ml-40'>
          <span className='sm:hidden'>
            MEET
            <br />
            SGaWD...
          </span>
          <span className='hidden sm:block'>MEET SGaWD...</span>
        </h1>
      </div>
    </div>
  );
};

export default WelcomeSection;
