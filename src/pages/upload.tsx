import Image from "next/image";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useLicense } from '@/components/context/LicenseContext';

const Upload = () => {
  const [imageUpload, setImageUpload] = useState<FileList | null>(null);
  const [imageURL, setImageURL] = useState<string | null>(null);
  const { licenseID, setLicenseID } = useLicense();

 const upload = async () => {
  if (imageUpload && imageUpload.length >   0) {
    const formData = new FormData();
    formData.append('file', imageUpload[0]);

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
      const licenseID = uuidv4(); // Generate a new UUID for the license ID

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

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="container mt-5">
        <div className="col-lg-8 offset-lg-2">
          <input type='file' onChange={(e) => setImageUpload(e.target.files)}></input>
          <button onClick={upload}>Upload</button>
        </div>
      </div>
      <br />
      {imageURL && <Image src={imageURL} alt="Uploaded Image" width={500} height={500}/>}
    </div>
  );
};

export default Upload;
