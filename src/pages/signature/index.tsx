// ** React/Next.js Imports
import { useRouter } from "next/navigation";
import React from "react";

// ** React95 Imports
import { Button } from "@react95/core";

// ** Custom Components, Hooks, Utils, etc.
import FanSignature from "@/components/FanSignature";
import { useLicense } from "@/context/LicenseContext";

const Signature = () => {
  const router = useRouter();
  const { licenseID } = useLicense();

  return (
    <div className='min-h-screen flex flex-col bg-black items-center justify-center'>
      <h1 className='font-bold text-5xl text-center text-white p-8'>
        Your Signature
      </h1>
      <FanSignature />
      <Button
        className='hover:bg-slate-300'
        onClick={() => router.push(`/license/${licenseID}`)}
      >
        Next
      </Button>
    </div>
  );
};

export default Signature;
