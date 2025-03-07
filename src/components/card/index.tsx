// ** React/Next.js Imports
import Image from "next/image";
import React from "react";

interface CardProps {
  card: string;
}
/**
 * The `Card` component renders a card with an image.
 *
 * @param {CardProps} props - The props for the Card component.
 * @param {string} props.card - The URL of the image to be displayed in the card.
 * @returns {JSX.Element} - The rendered Card component.
 */

const Card: React.FC<CardProps> = ({ card }) => {
  return (
    <div className='relative overflow-hidden justify-center items-center min-h-[400px] min-w-[200px] md:min-h-[300px] md:min-w-[300px] lg:min-h-[400px] lg:min-w-[200px]'>
      <Image
        src={card}
        alt='Card Image'
        fill={true}
        sizes='(max-width: 768px) 200px, (max-width: 1024px) 300px, 200px'
        style={{ objectFit: "contain" }}
      />
    </div>
  );
};

export default Card;
