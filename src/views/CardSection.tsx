import React from "react";
import { useRouter } from "next/navigation";
import { Button } from '@react95/core';
import { Access229 } from '@react95/icons';

const CardSection = ({ isConnected }: any)  => {
  const router = useRouter();

  return (
    <div  className="snap-start bg-green-200 w-screen h-screen flex items-center justify-center text-8xl">
      <div className="flex flex-col items-center justify-center space-y-4 ">
        <h1 className="font-bold p-8">Card Section</h1>
        <div className="flex flex-col items-center justify-center space-y-2">
          {isConnected ? (
            <h2 className="text-xl font-bold text-center">
              You are connected to MongoDB
            </h2>
          ) : (
            <h2 className="text-xl font-bold text-center">
              Could not connect to MongoDB
            </h2>
          )}
          <Access229 />
          <Button onClick={() => router.push('/upload')}>Create Your License</Button>
        </div>
      </div>
    </div>
  )
}

export default CardSection;