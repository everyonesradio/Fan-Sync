// ** React/Next.js Imports
import React, { useRef } from "react";

// ** React95 Imports
import { Frame, Button } from "@react95/core";

// ** Third-Party Imports
import SignatureCanvas from "react-signature-canvas";

// ** Custom Components, Hooks, Utils, etc.
import { useLicense } from "@/context/LicenseContext";
import { api } from "@/utils/trpc";

const FanSignature = () => {
  const { licenseID } = useLicense();
  const { mutateAsync: updateSignature } = api.fans.signature.useMutation();
  const sigCanvas = useRef<SignatureCanvas>(null);

  const saveSignature = async () => {
    const trimmedCanvas = sigCanvas.current?.getTrimmedCanvas();
    const image = trimmedCanvas ? trimmedCanvas.toDataURL("image/png") : null;

    try {
      if (image) {
        await updateSignature({
          uuid: licenseID!,
          signature: image
        })
      }
    } catch (error) {
      console.error("Error updating signature:", error);
      throw error;
    }
  };

  const clearCanvas = () => sigCanvas.current?.clear();

  return (
    <div className='flex flex-col items-center justify-between p-24'>
      <div className='container mt-5'>
        <Frame>
          <SignatureCanvas
            penColor='black'
            canvasProps={{ className: "w-full h-48" }}
            ref={sigCanvas}
          />
        </Frame>
        <br />
        <div className='flex justify-center space-x-4'>
          <Button className='hover:bg-slate-300' onClick={saveSignature}>
            Save
          </Button>
          <Button
            className='hover:bg-slate-300'
            onClick={() => {
              clearCanvas();
            }}
          >
            Clear
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FanSignature;
