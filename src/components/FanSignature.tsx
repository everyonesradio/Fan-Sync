import React, { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import { useLicense } from "@/components/context/LicenseContext";
import { Frame, Button } from "@react95/core";

const FanSignature = () => {
  const sigCanvas = useRef<SignatureCanvas>(null);
  const { licenseID } = useLicense();

  const saveSignature = async () => {
    const trimmedCanvas = sigCanvas.current?.getTrimmedCanvas();
    const image = trimmedCanvas ? trimmedCanvas.toDataURL("image/png") : null;

    // Call API route to save the signature image and update the MongoDB document
    const response = await fetch("/api/updateSignature", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ imageURL: image, uuid: licenseID }),
    });

    if (!response.ok) {
      console.error("Failed to update signature");
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
