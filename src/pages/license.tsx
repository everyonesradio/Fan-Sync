import React, { useState, useEffect } from "react";
import { useLicense } from "@/components/context/LicenseContext";
import FanLicense from "@/components/FanLicense";
import { FanData } from "@/types/fanData";

const License = () => {
  const { licenseID } = useLicense();
  const [fanData, setFanData] = useState<FanData | null>(null);
  const licenseBackgrounds = [
    "/images/card-1.png",
    "/images/card-2.png",
    "/images/card-3.png",
    "/images/card-4.png",
    "/images/card-5.png",
    "/images/card-6.png",
  ];

  useEffect(() => {
    const fetchFanData = async () => {
      if (licenseID) {
        try {
          const response = await fetch(`/api/getFanData?licenseID=${licenseID}`);
          if (!response.ok) {
            throw new Error('Failed to fetch fan data');
          };
          const data = await response.json();
          setFanData(data);
        } catch (error) {
          console.error('Error fetching fan data:', error);
        };
      };
    };

    fetchFanData();
  }, [licenseID]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="font-bold text-5xl text-center p-8">Share Your License</h1> 
      <FanLicense fanData={fanData}/>
      <div className="flex justify-around items-center mt-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="w-8 h-8 rounded-full bg-white mx-2"
          />
        ))}
      </div>
    </div>
  );
};

export default License;