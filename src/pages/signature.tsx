import React from "react";
import FanSignature from "@/components/FanSignature";
import { useRouter } from "next/navigation";
import { Button } from "@react95/core";

const Signature = () => {
  const router = useRouter();

  return (
    <div className='min-h-screen flex flex-col bg-black items-center justify-center'>
      <h1 className='font-bold text-5xl text-center text-white p-8'>Your Signature</h1>
      <FanSignature />
      <Button className='hover:bg-slate-300'onClick={() => router.push("/license")}>Next</Button>
    </div>
  );
};

export default Signature;
