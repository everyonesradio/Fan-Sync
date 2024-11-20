// ** React/Next.js Imports
import { useRouter } from "next/navigation";
import React from "react";

// ** React95 Imports
import { Button } from "@react95/core";

// ** Custom Components, Hooks, Utils, etc.
import FanSignature from "@/components/FanSignature";
import { useLicense } from "@/context/LicenseContext";
import { api } from "@/utils/trpc";

const Signature = () => {
  const router = useRouter();
  const { licenseID } = useLicense();
  const { data: fanData } = api.fans.get.useQuery(
    { uuid: String(licenseID) },
    { enabled: !!licenseID }
  );
  const { mutateAsync: welcomeEmail } = api.fans.email.useMutation();

  const handleNext = async () => {
    router.push(`/license/${licenseID}`);

    if (fanData) {
      try {
        await welcomeEmail({
          uuid: fanData.uuid,
          email: fanData.email,
        });
        console.log("Welcome email sent successfully");
      } catch (error) {
        console.error("Failed to send welcome email:", error);
      }
    }
  };

  return (
    <div className='min-h-screen flex flex-col bg-black items-center justify-center'>
      <h1 className='font-bold text-5xl text-center text-white p-8'>
        Your Signature
      </h1>
      <FanSignature />
      <Button className='hover:bg-slate-300' onClick={handleNext}>
        Next
      </Button>
    </div>
  );
};

export default Signature;
