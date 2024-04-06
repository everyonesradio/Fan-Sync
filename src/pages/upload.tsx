import Image from "next/image";
import { useState, useRef } from "react";
import { useLicense } from '@/components/context/LicenseContext';
import { useRouter } from "next/navigation";
import { HiUser } from "react-icons/hi2";
import { Button } from '@react95/core';

const Upload = () => {
  const [imageUpload, setImageUpload] = useState<FileList | null>(null);
  const [imageURL, setImageURL] = useState<string | null>(null);
  const { licenseID, setLicenseID } = useLicense();
  const router = useRouter();

  const upload = async (files: FileList | null) => {
    if (files && files.length > 0) {
       const formData = new FormData();
       formData.append('file', files[0]);
   
       try {
         const response = await fetch('/api/storage', {
           method: 'POST',
           body: formData,
         });
   
         if (!response.ok) {
           throw new Error(`HTTP error! status: ${response.status}`);
         }
   
         const data = await response.json();
         setImageURL(data.fileURL);
   
         // Use the licenseID from the context instead of generating a new one
         if (!licenseID) {
           throw new Error('License ID is not set');
         }
   
         // Send the licenseID and imageURL to the server to update the MongoDB document
         const updateResponse = await fetch('/api/updateLicense', {
           method: 'POST',
           headers: {
             'Content-Type': 'application/json',
           },
           body: JSON.stringify({ licenseID, imageURL: data.fileURL }),
         });
   
         if (!updateResponse.ok) {
           throw new Error(`Update error! status: ${updateResponse.status}`);
         }
   
         const updateResult = await updateResponse.json();
         console.log('Updated document:', updateResult.document);
       } catch (error) {
         console.error('Error:', error);
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
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="container mt-5">
        <h1 className="font-bold text-5xl text-center p-8">Upload Your Photo</h1>
        <div className="col-lg-8 offset-lg-2">
        <div className="photo-bg flex justify-center items-center w-50 h-50 bg-white rounded-full" onClick={handleDivClick}>
          {imageURL ? (
            <Image
              src={imageURL}
              alt="Uploaded Image"
              height={250}
              width={250}
              className="rounded-full aspect-square object-cover"
            />
          ) : (
            <HiUser size={200} />
          )}
          </div>
          {/* Hidden file input */}
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={(e) => {
              setImageUpload(e.target.files);
              upload(e.target.files);
            }}
          />
        </div>
      </div>
      <Button onClick={() => router.push('/form')}>Next</Button>
    </div>
  );
};

export default Upload;
