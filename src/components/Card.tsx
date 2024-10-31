// ** React/Next.js Imports
import Image from "next/image";
import React from "react";

interface CardProps {
  card: string;
}

const Card: React.FC<CardProps> = ({ card }) => {
  return (
    <div className='relative overflow-hidden justify-center items-center min-h-[400px] min-w-[200px] md:min-h-[300px] md:min-w-[300px] lg:min-h-[400px] lg:min-w-[200px]'>
      <Image
        src={card}
        alt='Card Image'
        fill={true}
        style={{ objectFit: "contain" }}
      />
    </div>
  );
};

export default Card;
