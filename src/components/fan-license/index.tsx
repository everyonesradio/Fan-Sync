// ** React/Next.js Imports
import Image from "next/image";
import React from "react";

// ** Custom Components, Hooks, Utils, etc.
import Card from "@/components/fan-license/3DLicenseCard";
import type { FansRouterOutputs } from "@/types/api";
import { truncateString } from "@/utils/truncate-string";
import { upperCase } from "@/utils/upper-case";

// ** Icon Imports
import { FaSpotify } from "react-icons/fa";

type FanType = NonNullable<FansRouterOutputs["get"]>;

interface Props {
  fanData: FanType;
  selectedBg: string | null;
}
/**
 * The `FanLicense` component renders a card-like UI element that displays information about a fan,
 * including their profile picture, username, location, date of birth, and a unique identifier (UUID). It also displays information about the fan's "anthem", which includes the name, release date, and album type.
 *
 * @param fanData - An object that contains the fan information.
 * @param selectedBg - The background image URL to be used for the fan license.
 * When the card is clicked, it will open the URL of the fan's anthem track in a new tab, if the `track_url` property is available in the `fanData` object.
 */

const FanLicense: React.FC<Props> = ({ fanData, selectedBg }) => {
  if (!fanData) {
    return <p>Loading fan data...</p>;
  }

  return (
    <>
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
        onClick={() =>
          fanData.anthem?.track_url &&
          window.open(fanData.anthem.track_url, "_blank")
        }
      >
        <>
          <div className='flex flex-col space-y-2 items-center text-white'>
            <Image
              src={fanData.profilePicture}
              alt='Profile picture'
              height={120}
              width={120}
              className='rounded-full aspect-square object-cover border-4 border-white'
            />
            <p className='font-bold text-xl'>{fanData.username}</p>
            <p>Location: {fanData.location}</p>
            <p>Date of Birth: {fanData.dob}</p>
            <p>NO. {fanData.uuid}</p>
            <div className='flex items-center w-auto h-auto space-x-2 bg-black rounded-full border-2 border-white py-1 px-7'>
              <div className='space-y-1'>
                <p className='truncate font-bold'>
                  &quot;{truncateString(fanData.anthem?.name || "", 20)}&quot;
                </p>
                <p>
                  {fanData.anthem?.release_date?.split("-")[0]} -{" "}
                  {fanData.anthem?.album_type &&
                    upperCase(fanData.anthem.album_type)}
                </p>
              </div>
              <FaSpotify className='text-2xl' />
            </div>
          </div>
        </>
      </Card>
    </>
  );
};

export default FanLicense;
