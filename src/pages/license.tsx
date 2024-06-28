// ** React/Next.js Imports
import React, { useState, useEffect } from "react";
import Image from "next/image";

// ** Custom Components
import { useLicense } from "@/components/context/LicenseContext";
import FanLicense from "@/components/FanLicense";

// ** Types
import { FanData } from "@/types/fanData";

const license = [
  "/images/licenses/001.png",
  "/images/licenses/002.png",
  "/images/licenses/003.png",
  "/images/licenses/004.png",
  "/images/licenses/005.png",
  "/images/licenses/006.png",
];

const License = () => {
  const { licenseID } = useLicense();
  const [fanData, setFanData] = useState<FanData | null>(null);
  const [selectedBg, setSelectedBg] = useState<string | null>(license[0]);

  const handleImageClick = (image: string) => {
    setSelectedBg(image);
  };

  useEffect(() => {
    const fetchFanData = async () => {
      if (licenseID) {
        try {
          const response = await fetch(
            `/api/getFanData?licenseID=${licenseID}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch fan data");
          }
          const data = await response.json();
          setFanData(data);
        } catch (error) {
          console.error("Error fetching fan data:", error);
        }
      }
    };

    fetchFanData();
  }, [licenseID]);

  return (
    <div className='min-h-screen flex flex-col bg-black items-center justify-center'>
      <h1 className='font-bold text-5xl text-center text-white p-8'>Share Your License</h1>
      <FanLicense fanData={fanData} selectedBg={selectedBg} />
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
