// ** React/Next.js Imports
import { useRouter } from "next/navigation";
import React from "react";

// ** React95 Imports
import { Button } from "@react95/core";

// ** Custom Components, Hooks, Utils, etc.
import Card from "@/components/Card";

const CardSection = () => {
  const router = useRouter();
  const cards = [
    "/images/card-1.png",
    "/images/card-2.png",
    "/images/card-3.png",
    "/images/card-4.png",
    "/images/card-5.png",
    "/images/card-6.png",
  ];

  return (
    <div className='snap-start bg-[#D9D9D9] w-screen h-screen flex items-center justify-center text-8xl'>
      <div className='flex flex-col items-center justify-center space-y-4'>
        <h3 className='font-medium p-8'>Join the Seddy Siren Club</h3>
        <div className='left-0 flex gap-12 overflow-hidden'>
          {[...cards].map((item, idx) => (
            <Card card={item} key={idx} />
          ))}
        </div>
        <div className='flex flex-col items-center justify-center space-y-2'>
          <Button
            className='hover:bg-slate-300'
            onClick={() => router.push("/upload")}
          >
            Create Your License
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CardSection;
