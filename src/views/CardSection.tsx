// ** React/Next.js Imports
import { useRouter } from "next/navigation";
import React from "react";

// ** React95 Imports
import { Button } from "@react95/core";

// ** Third-Party Imports
import Marquee from "react-fast-marquee";

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
    <div className='snap-start bg-[#D9D9D9] w-screen h-screen flex items-center justify-center'>
      <div className='flex flex-col items-center justify-center w-full space-y-4'>
        <h3 className='font-medium text-center text-5xl sm:text-8xl p-8'>Join the Seddy Siren Club</h3>
        <Marquee speed={100} autoFill={true}>
          <div className='flex gap-4 pr-4 sm:gap-12 sm:pr-12 overflow-hidden'>
            {cards.map((item) => (
              <Card card={item} key={`card-${item}`} />
            ))}
          </div>
        </Marquee>
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
