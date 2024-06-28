import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Input, Button } from "@react95/core";
import { useLicense } from "@/components/context/LicenseContext";

const Form = () => {
  const router = useRouter();
  const { licenseID } = useLicense();
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const response = await fetch("/api/updateUserInfo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uuid: licenseID,
        fullname,
        username,
        email,
        dob,
        location,
      }),
    });

    if (response.ok) {
      router.push("/anthem");
    } else {
      // Handle error
      console.error("Failed to update user info");
    }
  };

  return (
    <div className='flex flex-col bg-black items-center justify-center min-h-screen p-8'>
      <h1 className='font-bold text-5xl text-center text-white p-8'>
        Personal Information
      </h1>
      <form onSubmit={handleSubmit} className='w-full max-w-md flex flex-col'>
        <Input
          placeholder='Full Name'
          fullWidth
          className='mb-4'
          value={fullname}
          onChange={(e: any) => setFullname(e.target.value)}
        />
        <Input
          placeholder='Email'
          fullWidth
          className='mb-4'
          value={email}
          onChange={(e: any) => setEmail(e.target.value)}
        />
        <Input
          placeholder='Username'
          fullWidth
          className='mb-4'
          value={username}
          onChange={(e: any) => setUsername(e.target.value)}
        />
        <Input
          placeholder='Date of Birth'
          fullWidth
          className='mb-4'
          value={dob}
          onChange={(e: any) => setDob(e.target.value)}
        />
        <Input
          placeholder='Location'
          fullWidth
          className='mb-4'
          value={location}
          onChange={(e: any) => setLocation(e.target.value)}
        />
        <Button type='submit' className='mt-8'>
          Next
        </Button>
      </form>
    </div>
  );
};

export default Form;
