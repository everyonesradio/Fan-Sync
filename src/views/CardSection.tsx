import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { animate, motion, useMotionValue } from "framer-motion";
import Card from "@/components/Card";
import useMeasure from "react-use-measure";
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

  let [ref, { width }] = useMeasure();
  const xTranslation = useMotionValue(0);

  useEffect(() => {
    let controls: any;
    let finalPosition = -width / 2 - 8;

    controls = animate(xTranslation, [0, finalPosition], {
      ease: "linear",
      duration: 15,
      repeat: Infinity,
      repeatType: "loop",
      repeatDelay: 0,
    });

    return () => {
      if (controls) {
        controls.stop();
      }
    };
  }, [width, xTranslation]);

  return (
    <div className='snap-start bg-green-200 w-screen h-screen flex items-center justify-center text-8xl'>
      <div className='flex flex-col items-center justify-center space-y-4'>
        <h3 className='font-bold p-8'>Join the Seddy Siren Club</h3>
        <motion.div
          className='left-0 flex gap-12'
          ref={ref}
          style={{ x: xTranslation }}
        >
          {[...cards, ...cards].map((item, idx) => (
            <Card card={item} key={idx} />
          ))}
        </motion.div>
        <div className='flex flex-col items-center justify-center space-y-2'>
          <Button onClick={() => router.push("/upload")}>
            Create Your License
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CardSection;
