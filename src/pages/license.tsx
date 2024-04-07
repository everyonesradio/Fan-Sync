import React, { useEffect, useRef } from "react";
import FanLicense from "@/components/FanLicense";
import { animate, motion, useMotionValue, useTransform, useMotionTemplate } from "framer-motion";
import styled from "@emotion/styled";

const Container = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  perspective: 1000px;
`;

const RotationWrapper = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  transform-style: preserve-3d;
`;

const LicenseWrapper = styled(motion.div)`
  border-radius: 20px;
  backdrop-filter: blur(3px) brightness(120%);
`;

const License = () => {
  // Mouse position
  const mouseX = useMotionValue(
    typeof window !== 'undefined' ? window.innerWidth / 2 : 0
  );

  const mouseY = useMotionValue(
    typeof window !== 'undefined' ? window.innerHeight / 2 : 0
  );

  // Reference for our animated license element
  const licenseRef = useRef<HTMLDivElement>(null);
  
  // Rotation
  const dampen = 20;
  const rotateX = useTransform<number, number>(mouseY, (newMouseY) => {
    if (!licenseRef.current) return 0;
    const rect = licenseRef.current?.getBoundingClientRect();
    const newRotateX = newMouseY - rect.top - rect?.height / 2;
    return -newRotateX / dampen;
  });

  const rotateY = useTransform<number, number>(mouseX, (newMouseX) => {
    if (!licenseRef.current) return 0;
    const rect = licenseRef.current?.getBoundingClientRect();
    const newRotateY = newMouseX - rect.top - rect?.height / 2;
    return -newRotateY / dampen;
  });

  // Gradient sheen
  const diagonalMovement = useTransform<number, number>(
    [rotateX, rotateY],
    ([newRotateX, newRotateY]) => {
      const position: number = newRotateX + newRotateY;
      return position;
    }
  );

  const sheenPosition = useTransform(diagonalMovement, [-5, 5], [-100, 200]);

  const sheenOpacity = useTransform(
    sheenPosition,
    [-100, 50, 200],
    [0, 0.5, 0]
  );

  const sheenGradient = useMotionTemplate`linear-gradient(
    55deg, 
    transparent, 
    rbga(255 255 255 / ${sheenOpacity}) ${sheenPosition}%, 
    transparent)`;

  // Handle mouse move on document
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Animate mouse x and y
      animate(mouseX, e.clientX);
      animate(mouseY, e.clientY);
    };

    if (typeof window === 'undefined') return;
    // Recalculate grid on resize
    window.addEventListener('mousemove', handleMouseMove);
    // cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);
  

  return (
    <Container>
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="font-bold text-5xl text-center p-8">Share Your License</h1>
        <RotationWrapper style={{ rotateX, rotateY }}>
          <LicenseWrapper ref={licenseRef} style={{ backgroundImage: sheenGradient }}>
            <FanLicense />
          </LicenseWrapper>
        </RotationWrapper>
      </div>
    </Container>
  );
};

export default License; // Thank you to arielbk for the 3D card (https://dev.to/arielbk/how-to-make-a-3d-shiny-card-animation-react-ts-and-framer-motion-ijf)