// ** React/Next.js Imports
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState, useRef } from "react";

// ** React95 Imports
import { Button } from "@react95/core";

// ** Custom Components, Hooks, Utils, etc.
import { useFormContext } from "@/context/FormDataContext";

// ** Icon Imports
import { HiUser } from "react-icons/hi2";

const Upload = () => {
  const [imageURL, setImageURL] = useState<string | null>(null);
  const router = useRouter();
  const { setFormData } = useFormContext();

  const upload = async (files: FileList | null) => {
    if (files && files.length > 0) {
      try {
        const formData = new FormData();
        formData.append("file", files[0]);
        setFormData(formData);

        const fileUrl = URL.createObjectURL(files[0]);
        setImageURL(fileUrl);
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      alert("Please select a file to upload");
    }
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDivClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className='flex min-h-screen bg-black flex-col items-center justify-evenly p-4 sm:p-24'>
      <div className='container mt-5'>
        <h1 className='font-bold text-5xl text-center p-8 text-white'>
          Upload Your Photo
        </h1>
        <div className='col-lg-8 offset-lg-2'>
          <button
            className='photo-bg flex justify-center items-center w-50 h-50 bg-white rounded-full'
            onClick={handleDivClick}
          >
            {imageURL ? (
              <Image
                src={imageURL}
                alt='Uploaded Image'
                height={250}
                width={250}
                className='rounded-full aspect-square object-cover'
              />
            ) : (
              <HiUser size={200} />
            )}
          </button>
          {/* Hidden file input */}
          <input
            type='file'
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={(e) => {
              upload(e.target.files);
            }}
          />
        </div>
      </div>
      <Button
        className={`${!imageURL ? "" : "hover:bg-slate-300 w-52"} `}
        onClick={() => router.push("/form")}
        disabled={!imageURL}
        style={{ color: !imageURL ? "lightgray" : "black" }}
      >
        Next
      </Button>
    </div>
  );
};

export default Upload;
