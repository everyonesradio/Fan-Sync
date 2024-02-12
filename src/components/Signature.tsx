import React, { useRef, useState } from "react";
import Image from 'next/image';
import SignatureCanvas from "react-signature-canvas";

const Signature = () => {
  const sigCanvas = useRef<SignatureCanvas>(null);
  const [imageURL, setImageURL] = useState<string | null>(null);

  const saveSignature = () => {
      const trimmedCanvas = sigCanvas.current?.getTrimmedCanvas();
      const URL = trimmedCanvas ? trimmedCanvas.toDataURL("image/png") : null;
      console.log(URL)
      setImageURL(URL);
  };

  const clearCanvas = () => sigCanvas.current?.clear();

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="container mt-5">
        <h1>Your Signature Here</h1>
        <SignatureCanvas 
          penColor='black' 
          canvasProps={{className : "w-full h-48"}}
          ref={sigCanvas}  
        />
        <hr />
        <button  
          className="border-none ml-auto text-gray-500 p-0 block mt-1 mb-auto bg-gray-300 hover:bg-transparent hover:text-black"
          onClick={() => { clearCanvas() }}
        >
          Clear
        </button>
        <button className="create" onClick={saveSignature}>
          Save
        </button>
      </div>
      <br />
      <div className="signature-preview">
      { imageURL && (
        <Image
          src={imageURL}
          alt="signature"
          width={500} // Set the desired width
          height={200} // Set the desired height
          className="signature"
        />
      )}
      </div>
    </div>
  )
};

export default Signature;
