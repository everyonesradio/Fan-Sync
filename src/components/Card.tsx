import React from "react";
import Image from "next/image";

interface CardProps {
  card: string;
}

const Card: React.FC<CardProps> = ({ card }) => {
  return (
    <div className='relative overflow-hidden justify-center items-center min-h-[200px] min-w-[200px] md:min-h-[300px] md:min-w-[300px] lg:min-h-[400px] lg:min-w-[200px]'>
      <Image
        src={card}
        alt='Card Image'
        loading='lazy'
        fill
        style={{ objectFit: "contain" }}
      />
    </div>
  );
};

export default Card;
