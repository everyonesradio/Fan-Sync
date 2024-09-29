// ** React/Next.js Imports
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";

// ** Custom Components, Hooks, Utils, etc.
import FanLicense from "@/components/FanLicense";
import { api } from "@/utils/trpc";

const license = [
  "/images/licenses/001.png",
  "/images/licenses/002.png",
  "/images/licenses/003.png",
  "/images/licenses/004.png",
  "/images/licenses/005.png",
  "/images/licenses/006.png",
];

const License = () => {
  const router = useRouter();
  const licenseID = router.query.id as string;
  const { data: fanData } = api.fans.get.useQuery(
    { uuid: String(licenseID) },
    { enabled: !!licenseID }
  );

  const [selectedBg, setSelectedBg] = useState<string | null>(license[0]);

  const handleImageClick = (image: string) => {
    setSelectedBg(image);
  };

  return (
    <div className='min-h-screen flex flex-col bg-black items-center justify-center p-4 sm:p-8'>
      <h1 className='font-bold text-5xl text-center text-white p-4 sm:p-8 mb-2'>
        Share Your License
      </h1>
      {fanData && <FanLicense fanData={fanData} selectedBg={selectedBg} />}
      <div className='flex justify-around items-center mt-6'>
        {license.map((background) => (
          <button
            key={background}
            className='w-8 h-8 mx-2'
            onClick={() => handleImageClick(background)}
          >
            <Image
              src={background}
              alt={"License Background"}
              width={100}
              height={100}
              className='rounded-full aspect-square object-cover hover:border-white hover:border-2'
            />
          </button>
        ))}
      </div>
    </div>
  );
};
export default License;
