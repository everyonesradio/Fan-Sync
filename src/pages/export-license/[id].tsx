// ** React/Next.js Imports
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState, useRef } from "react";

// ** Third-Party Imports
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Loader2 } from "lucide-react";

// ** Custom Components, Hooks, Utils, etc.
import License from "@/components/export-license";
import { api } from "@/utils/trpc";

const license = [
  "/images/licenses/002.png",
  "/images/licenses/003.png",
  "/images/licenses/004.png",
  "/images/licenses/001.png",
  "/images/licenses/005.png",
  "/images/licenses/006.png",
];

const ExportLicense = () => {
  const router = useRouter();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const licenseID = router.query.id as string;
  const { data: fanData } = api.fans.get.useQuery(
    { uuid: String(licenseID) },
    { enabled: !!licenseID }
  );

  const [selectedBg, setSelectedBg] = useState<string | null>(license[0]);

  const handleImageClick = (image: string) => {
    setSelectedBg(image);
  };

  const takeScreenshot = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Use preserveDrawingBuffer to ensure the canvas content is available
    const imgData = canvas.toDataURL('image/png')
    
    // Create and trigger download
    const link = document.createElement('a');
    link.href = imgData;
    link.download = `seddy-${licenseID}.png`;
    link.click();
  };

  return (
    <div className='min-h-screen flex flex-col bg-black items-center justify-center p-4 sm:p-8'>
      <h1 className='font-semibold text-5xl text-center text-white'>
        Seddy Siren Club
      </h1>
      <div className='w-full h-[500px]'>
      {!fanData ? (
        <div className='flex items-center justify-center my-32'>
          <Loader2 className='h-16 w-16 animate-spin text-white' />
        </div>
      ) : (
        <Canvas camera={{ position: [0, 0, 6], fov: 75 }} gl={{ preserveDrawingBuffer: true }} ref={canvasRef}>
          <pointLight position={[10, 10, 10]} />
          <License fanData={fanData} selectedBg={selectedBg} />
          <OrbitControls makeDefault />
        </Canvas>
      )}
      </div>
      <div className='flex justify-around items-center'>
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
        onClick={takeScreenshot}
        className="px-4 py-2 bg-white text-black rounded-md mt-4"
      >
        Save License Image
      </button>
    </div>
  );
};

export default ExportLicense;
