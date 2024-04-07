import React from "react";
import FanSignature from "@/components/FanSignature";
import { useRouter } from "next/navigation";
import { Button } from "@react95/core";

const Signature = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="font-bold text-5xl text-center p-8">Your Signature</h1>
      <FanSignature />
      <Button onClick={() => router.push('/license')}>Next</Button>
    </div>
  );
};

export default Signature;