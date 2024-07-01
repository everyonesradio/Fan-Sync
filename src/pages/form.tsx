import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input, Button } from "@react95/core";
import { useLicense } from "@/components/context/LicenseContext";
interface FormErrors {
  fullname?: string;
  email?: string;
  username?: string;
  dob?: string;
  location?: string;
}

const Form = () => {
  const router = useRouter();
  const { licenseID } = useLicense();
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("@");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [location, setLocation] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    validateForm();
  }, [fullname, email, username, dob, location]);

  // Validate form
  const validateForm = () => {
    let errors = {} as FormErrors;

    if (!fullname && fullname.length === 0) {
      errors.fullname = "Full name is required";
    }

    if (!email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid";
    }

    if (!username) {
      errors.username = "Username is required";
    } else if (!/@\S+/.test(username)) {
      errors.username = "Username is invalid";
    }

    if (!dob) {
      errors.dob = "Date of Birth is required";
    } else if (!/\d{2}\/\d{2}\/\d{4}/.test(dob)) {
      errors.dob = "Date of Birth is invalid";
    }

    if (!location) {
      errors.location = "Location is required";
    } else if (!/\S+, \S+/.test(location) && !/\S+,\S+/.test(location)) {
      errors.location = "Location is invalid";
    }

    setErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };

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

    if (isFormValid) {
      if (response.ok) {
        router.push("/anthem");
      } else {
        // Handle error
        console.error("Failed to update user info");
      }
    } else {
      console.error("Form entries are invalid. Please fix them");
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
        {errors.fullname && <p className='text-red-500'>{errors.fullname}</p>}
        <Input
          placeholder='Email'
          fullWidth
          className='mb-4'
          value={email}
          onChange={(e: any) => setEmail(e.target.value)}
        />
        {errors.email && <p className='text-red-500'>{errors.email}</p>}
        <Input
          placeholder='Username'
          fullWidth
          className='mb-4'
          value={username}
          onChange={(e: any) => setUsername(e.target.value)}
        />
        {errors.username && <p className='text-red-500'>{errors.username}</p>}
        <Input
          placeholder='Date of Birth (MM/DD/YYYY)'
          fullWidth
          className='mb-4'
          value={dob}
          onChange={(e: any) => setDob(e.target.value)}
        />
        {errors.dob && <p className='text-red-500'>{errors.dob}</p>}
        <Input
          placeholder='Location (City, Country)'
          fullWidth
          className='mb-4'
          value={location}
          onChange={(e: any) => setLocation(e.target.value)}
        />
        {errors.location && <p className='text-red-500'>{errors.location}</p>}
        <Button
          type='submit'
          disabled={!isFormValid}
          className='hover:bg-slate-300 mt-8'
        >
          Next
        </Button>
      </form>
    </div>
  );
};

export default Form;
