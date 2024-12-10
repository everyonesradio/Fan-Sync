// ** React/Next.js Imports
import { useRouter } from "next/navigation";
import React, { useState, type ChangeEvent } from "react";

// ** React95 Imports
import { Input, Button } from "@react95/core";

// ** Custom Components, Hooks, Utils, etc.
import { useFormContext } from "@/context/FormDataContext";
import { useLicense } from "@/context/LicenseContext";
import { api } from "@/utils/trpc";

interface FormErrors {
  fullname?: string;
  email?: string;
  username?: string;
  dob?: string;
  location?: string;
}

// TODO: Restructure & simplify form submission logic

const Form = () => {
  const router = useRouter();
  const { licenseID } = useLicense();
  const { formData } = useFormContext();
  const { mutateAsync: newFan } = api.fans.create.useMutation();

  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("@");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [location, setLocation] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [isFormValid, setIsFormValid] = useState(false);

  // Validate form
  const validateForm = () => {
    const errors = {} as FormErrors;

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

  const validateField = (name: string, value: string) => {
    const fieldErrors = { ...errors };
    switch (name) {
      case "fullname":
        if (!value) {
          fieldErrors.fullname = "Full name is required";
        } else {
          delete fieldErrors.fullname;
        }
        break;
      case "email":
        if (!value) {
          fieldErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          fieldErrors.email = "Email is invalid";
        } else {
          delete fieldErrors.email;
        }
        break;
      case "username":
        if (!value) {
          fieldErrors.username = "Username is required";
        } else if (!/@\S+/.test(value)) {
          fieldErrors.username = "Username is invalid";
        } else {
          delete fieldErrors.username;
        }
        break;
      case "dob":
        if (!value) {
          fieldErrors.dob = "Date of Birth is required";
        } else if (!/\d{2}\/\d{2}\/\d{4}/.test(value)) {
          fieldErrors.dob = "Date of Birth is invalid";
        } else {
          delete fieldErrors.dob;
        }
        break;
      case "location":
        if (!value) {
          fieldErrors.location = "Location is required";
        } else if (!/\S+, \S+/.test(value) && !/\S+,\S+/.test(value)) {
          fieldErrors.location = "Location is invalid";
        } else {
          delete fieldErrors.location;
        }
        break;
      default:
        break;
    }

    setErrors(fieldErrors);
    setIsFormValid(Object.keys(fieldErrors).length === 0);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  const executeRequests = async () => {
    try {
      const uploadImageResponse = await fetch("/api/storage", {
        method: "POST",
        body: formData,
      });
      if (!uploadImageResponse.ok) {
        throw new Error(
          `Upload Image Error! status: ${uploadImageResponse.status}`
        );
      }
      const { fileURL } = await uploadImageResponse.json();

      const response = await newFan({
        uuid: licenseID!,
        fullname,
        username,
        email,
        dob,
        location,
        profilePicture: fileURL,
      });

      if (response) {
        router.push("/anthem");
      } else {
        // Handle error
        throw new Error("Server error!");
      }
    } catch (error) {
      console.error("Error making requests:", error);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    validateForm();
    if (isFormValid) {
      if (!licenseID) {
        throw new Error("License ID is not set");
      }
      if (!formData) {
        throw new Error("Image Data is missing");
      }
      executeRequests();
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
          name='fullname'
          placeholder='Full Name'
          fullWidth
          className={`${errors.fullname ? "mb-0" : "mb-4"}`}
          value={fullname}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setFullname(e.target.value)
          }
          onBlur={handleBlur}
          required
        />
        {errors.fullname && (
          <p className='mb-4 indent-0.5 font-bold text-red-500'>
            {errors.fullname}
          </p>
        )}
        <Input
          name='email'
          placeholder='Email'
          fullWidth
          className={`${errors.email ? "mb-0" : "mb-4"}`}
          value={email}
          onChange={(e: any) => setEmail(e.target.value)}
          onBlur={handleBlur}
          required
        />
        {errors.email && (
          <p className='mb-4 indent-0.5 font-bold text-red-500'>
            {errors.email}
          </p>
        )}
        <Input
          name='username'
          placeholder='Username'
          fullWidth
          className={`${errors.username ? "mb-0" : "mb-4"}`}
          value={username}
          onChange={(e: any) => setUsername(e.target.value)}
          onBlur={handleBlur}
          required
        />
        {errors.username && (
          <p className='mb-4 indent-0.5 font-bold text-red-500'>
            {errors.username}
          </p>
        )}
        <Input
          name='dob'
          placeholder='Date of Birth (MM/DD/YYYY)'
          fullWidth
          className={`${errors.dob ? "mb-0" : "mb-4"}`}
          value={dob}
          onChange={(e: any) => setDob(e.target.value)}
          onBlur={handleBlur}
          required
        />
        {errors.dob && (
          <p className='mb-4 indent-0.5 font-bold text-red-500'>{errors.dob}</p>
        )}
        <Input
          name='location'
          placeholder='Location (City, Country)'
          fullWidth
          className={`${errors.location ? "mb-0" : "mb-4"}`}
          value={location}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setLocation(e.target.value)
          }
          onBlur={handleBlur}
          required
        />
        {errors.location && (
          <p className='mb-4 indent-0.5 font-bold text-red-500'>
            {errors.location}
          </p>
        )}

        <Button
          type='submit'
          disabled={!isFormValid}
          className={`mt-7 ${!isFormValid ? "text-gray-400" : "hover:bg-slate-300 text-black "}`}
        >
          Next
        </Button>
      </form>
    </div>
  );
};

export default Form;
