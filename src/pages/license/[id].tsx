// ** React/Next.js Imports
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";

// ** Third-Party Imports
import download from "downloadjs";
import * as htmlToImage from "html-to-image";
import { Loader2 } from "lucide-react";

// ** Custom Components, Hooks, Utils, etc.
import FanLicense from "@/components/fan-license";
import ExportTemplate from "@/components/fan-license/export-template";
import { api } from "@/utils/trpc";

const license = [
  "/images/licenses/002.png",
  "/images/licenses/003.png",
  "/images/licenses/004.png",
  "/images/licenses/007.png",
  "/images/licenses/001.png",
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

  const downloadLicense = async () => {
    const element = document.getElementById("export");
    await htmlToImage.toJpeg(element!).then(function (dataUrl) {
      download(dataUrl, `fan-license-${licenseID}`, "image/png");
    });
  };

  /* TODO: Download license via API call
  const downloadLicense = async () => {
  try {
    const response = await fetch('/api/generate-license', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fanData,
        selectedBg,
      }),
    });

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `fan-license-${licenseID}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error('Error generating license:', error);
  }
};
 */

  return (
    <div className='min-h-screen flex flex-col bg-black items-center justify-center p-4 sm:p-8'>
      <h1 className='font-bold text-5xl text-center text-white p-4 sm:p-8 mb-2'>
        Share Your License
      </h1>
      {/* Preview template */}
      {!fanData ? (
        <div className='flex items-center justify-center my-32'>
          <Loader2 className='h-16 w-16 animate-spin text-white' />
        </div>
      ) : (
        <FanLicense fanData={fanData} selectedBg={selectedBg} />
      )}

      {/* Hidden export template */}
      {fanData && <ExportTemplate fanData={fanData} selectedBg={selectedBg} />}

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
      <button
        onClick={downloadLicense}
        className='px-4 py-2 bg-white text-black rounded-md mt-4'
      >
        Download License
      </button>
    </div>
  );
};

export default License;
