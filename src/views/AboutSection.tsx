// ** React/Next.js Imports
import React from "react";

const AboutSection = () => {
  return (
    <div className='snap-start bg-black w-screen h-screen flex items-center justify-center'>
      <div className='flex flex-col w-full m-8 p-4 sm:m-16 sm:p-12 space-y-8'>
        <h1 className='text-2xl sm:text-6xl font-bold text-white'>
          ...a trailblazing rap sensation on the rise
        </h1>
        <div className='flex flex-col text-white text-md sm:text-xl space-y-4'>
          <span>
            SGaWD has become a household name and a force to be reckoned with.
            The female MC emerges at the forefront of a new generation of
            Nigerian artists pioneering a new wave of African music, captivating
            her global audience with her bold fusion of rap, house, electronica,
            and afrobeats.
          </span>
          <span>
            With her latest EP, ‘Tha GaWD – Side A’, SGaWD presents a genre
            bending masterclass that seamlessly transitions between melodic
            flows and captivating vocals. The 7-track EP reflects SGaWD’s growth
            as an artist and a woman navigating the complexities of the music
            industry, embodying her journey of self-discovery and artistic
            freedom.
          </span>
        </div>
        <div className='flex-row space-y-4 sm:hidden w-full items-center justify-center sm:space-x-12'>
          {/* YouTube Video Embed */}
          <div>
            <iframe
              src='https://www.youtube.com/embed/c84st3J2znQ?si=Jlind0gUS46WUH24'
              title='YouTube Video Player'
              allowFullScreen
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
              referrerPolicy='strict-origin-when-cross-origin'
              loading='lazy'
            ></iframe>
          </div>
          {/* Spotify Embed */}
          <div>
            <iframe
              title='Spotify Album Embed'
              src='https://open.spotify.com/embed/album/72FBV70oygMH6ELBZ4Zod6?utm_source=generator'
              width='100%'
              allowFullScreen
              allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'
              loading='lazy'
            ></iframe>
          </div>
          </div>
        <div className='hidden space-y-4 sm:flex w-full items-center justify-center sm:space-x-12'>
          {/* YouTube Video Embed */}
          <div>
            <iframe
              width='560'
              height='315'
              src='https://www.youtube.com/embed/c84st3J2znQ?si=Jlind0gUS46WUH24'
              title='YouTube Video Player'
              allowFullScreen
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
              referrerPolicy='strict-origin-when-cross-origin'
              loading='lazy'
            ></iframe>
          </div>
          {/* Spotify Embed */}
          <div style={{ width: "560px", borderRadius: "12px" }}>
            <iframe
              title='Spotify Album Embed'
              src='https://open.spotify.com/embed/album/72FBV70oygMH6ELBZ4Zod6?utm_source=generator'
              width='100%'
              height='352'
              allowFullScreen
              allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'
              loading='lazy'
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
