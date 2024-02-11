import Image from "next/image";
import { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebase/firebase";

const Upload = () => {
  const [fileUpload, setFileUpload] = useState<FileList | null>(null);
  const upload = () => {
    // code to handle file upload
    console.log(fileUpload);
    if (fileUpload !== null) {
      const fileRef = ref(storage, `avatars/${fileUpload[0].name}`);
      uploadBytes(fileRef, fileUpload[0]).then((snapshot) => {
        // TODO: Add progress bar
        getDownloadURL(snapshot.ref).then((downloadURL) => {
          console.log(`File available at ${downloadURL}`);
        });
      }).catch((error) => {
        console.error(error);
      });
    } else {
      alert("Please select a file to upload");
    }
  };
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="container mt-5">
        <div className="col-lg-8 offset-lg-2">
          <input type='file' onChange={(e) => setFileUpload(e.target.files)}></input>
          <button onClick={upload}>Upload</button>
        </div>
      </div>
    </div>
  )
}

export default Upload;