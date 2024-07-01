import React from "react";

const ProjectSection = () => {
  return (
    <div className='snap-start bg-black w-screen h-screen flex items-center justify-center'>
      <div className='flex flex-col m-16 h-5/6 border-4 border-white p-12 space-y-8'>
        <h1 className='text-6xl font-bold text-white'>
          ...introducing fansync
        </h1>
        <span className='text-white text-xl py-6'>
          <div className='text-white text-xl py-6'>
            FanSync is a platform focused on empowering artists to build
            community organically and take control of their fan data. The
            project started from a hackathon and has now evolved into an
            innovative tool for artist-fan engagement. Our first iteration is a
            partnership with SGaWD to create a comprehensive database of her
            fans and re-capture fan engagement.
          </div>
          <div className='text-white text-xl py-6'>
            This project empowers SGaWD’s fans to craft personalized licenses,
            opening doors to exclusive perks such as limited-edition
            merchandise, promotional offers, and access to special events. This
            enables SGaWD and her team to streamline fan engagement efforts
            effectively. By embracing these licenses, fans not only gain access
            to a suite of exclusive benefits but also actively contribute to
            SGaWD’s artistic journey.
          </div>
          <div className='text-white text-xl py-6'>
            With the introduction of different tiers, fans can acquire licenses
            that match their level of dedication, unlocking a spectrum of
            privileges. This approach not only enhances the overall fan
            experience but also establishes a direct avenue for fans to share in
            SGaWD’s artistry.
          </div>
        </span>
      </div>
    </div>
  );
};

export default ProjectSection;
