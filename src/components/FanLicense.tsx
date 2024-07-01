// ** React/Next.js Imports
import React from "react";
import Image from "next/image";

// ** Custom Components
import Card from "@/components/3DLicenseCard";

// ** Third-Party Imports
import { FaSpotify } from "react-icons/fa";

// ** Util Imports
import { upperCase } from "@/util/upper-case";

// ** Types
import { FanData } from "@/types/fanData";

interface FanLicenseProps {
  fanData: FanData | null;
  selectedBg: string | null;
}

const FanLicense: React.FC<FanLicenseProps> = ({ fanData, selectedBg }) => {
  if (!fanData) {
    return <p>Loading fan data...</p>;
  }

  const truncateString = (str: string, maxLength: number) => {
    if (str.length > maxLength) {
      return `${str.substring(0, maxLength)}...`;
    }
    return str;
  };

  return (
    <Card
      style={{
        width: "300px",
        height: "450px",
        backgroundColor: "rgba(245, 101, 101, 0)",
        backgroundImage: `url(${selectedBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "1rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        color: "rgba(245, 101, 101, 0)",
        transition: "background-image 0.4s ease-in-out",
      }}
      onClick={() => window.open(fanData.anthem.track_url, "_blank")}
    >
      <div>
        <div className='flex flex-col space-y-2 items-center text-white'>
          <Image
            src={fanData.profile_picture}
            alt='Profile picture'
            height={120}
            width={120}
            className='rounded-full aspect-square object-cover border-4 border-white'
          />
          <p className='font-bold text-xl'>{fanData.username}</p>
          <p>Location: {fanData.location}</p>
          <p>Date of Birth: {fanData.dob}</p>
          <p>NO. {fanData.uuid}</p>
          <div className='flex items-center space-x-2 bg-black rounded-full border-2 border-white py-1 px-7'>
            <div className='space-y-1'>
              <p className='truncate font-bold'>
                &quot;{truncateString(fanData.anthem.name, 20)}&quot;
              </p>
              <p>
                {fanData.anthem.release_date.split("-")[0]} -{" "}
                {upperCase(fanData.anthem.album_type)}
              </p>
            </div>
            <FaSpotify className='text-3xl' />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default FanLicense;
