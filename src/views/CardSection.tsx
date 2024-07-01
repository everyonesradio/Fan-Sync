//import { useEffect } from "react";
import { useRouter } from "next/navigation";
//import { animate, motion, useMotionValue } from "framer-motion";
import Card from "@/components/Card";
//import useMeasure from "react-use-measure";
import { Button } from "@react95/core";

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

  /*let [ref, { width }] = useMeasure();
  const xTranslation = useMotionValue(0);
  
  useEffect(() => {
    let controls: any;
    let intervalId: NodeJS.Timeout;
    const finalPosition = -(width / 2) - 6;
    
    controls = animate(xTranslation, [0, finalPosition], {
      ease: "linear",
      duration: 12,
      repeat: Infinity,
      repeatType: static,
      repeatDelay: 0,
    });

    // Trying Automatic cycling logic
    const automateCarousel = () => { 
      const currPosition = xTranslation.get();
      const nextPosition = currPosition + width;
      xTranslation.set(nextPosition);
    };

    intervalId = setInterval(automateCarousel, 1000);

    return () => {
      if (controls) {
        controls.stop();
      }
      clearInterval(intervalId);
    };
  }, [width]);*/

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
