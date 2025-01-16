// ** React/Next.js Imports
import { useRouter } from "next/navigation";
import React, { type ChangeEvent } from "react";

// ** React95 Imports
import { Input, Button } from "@react95/core";

// ** Third-Party Imports
import { useForm } from "react-hook-form";

// ** Custom Components, Hooks, Utils, etc.
import { useFormContext } from "@/context/FormDataContext";
import { useLicense } from "@/context/LicenseContext";
import { api } from "@/utils/trpc";

interface FormInputs {
  fullname: string;
  email: string;
  username: string;
  dob: string;
  location: string;
}

const Form = () => {
  const router = useRouter();
  const { licenseID } = useLicense();
  const { formData } = useFormContext();
  const { mutateAsync: newFan } = api.fans.create.useMutation();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<FormInputs>({
    mode: "onBlur",
  });

  // Handle username input transformation
  const _username = watch("username");

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const transformValue = value.startsWith("@") ? value : `@${value}`;
    setValue("username", transformValue);
  };

  const formSubmission = async (data: FormInputs) => {
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
        ...data,
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

  const onSubmit = async (data: FormInputs) => {
    if (!licenseID) {
      throw new Error("License ID is not set");
    }
    if (!formData) {
      throw new Error("Image Data is missing");
    }
    formSubmission(data);
  };

  return (
    <div className='flex flex-col bg-black items-center justify-center min-h-screen p-8'>
      <h1 className='font-bold text-5xl text-center text-white p-8'>
        Personal Information
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='w-full max-w-md flex flex-col'
      >
        <Input
          {...register("fullname", {
            required: "Full name is required",
          })}
          placeholder='Full Name'
          fullWidth
          className={`${errors.fullname ? "mb-0" : "mb-4"}`}
        />
        {errors.fullname && (
          <p className='mb-4 indent-0.5 font-bold text-red-500'>
            {errors.fullname.message}
          </p>
        )}
        <Input
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Email is invalid",
            },
          })}
          placeholder='Email'
          fullWidth
          className={`${errors.email ? "mb-0" : "mb-4"}`}
        />
        {errors.email && (
          <p className='mb-4 indent-0.5 font-bold text-red-500'>
            {errors.email.message}
          </p>
        )}
        <Input
          {...register("username", {
            required: "Username is required",
          })}
          placeholder='Username'
          fullWidth
          className={`${errors.username ? "mb-0" : "mb-4"}`}
          onChange={handleUsernameChange}
        />
        {errors.username && (
          <p className='mb-4 indent-0.5 font-bold text-red-500'>
            {errors.username.message}
          </p>
        )}
        <Input
          {...register("dob", {
            required: "Date of Birth is required",
            pattern: {
              value: /\d{2}\/\d{2}\/\d{4}/,
              message: "Use format MM/DD/YYYY",
            },
          })}
          placeholder='Date of Birth (MM/DD/YYYY)'
          fullWidth
          className={`${errors.dob ? "mb-0" : "mb-4"}`}
        />
        {errors.dob && (
          <p className='mb-4 indent-0.5 font-bold text-red-500'>
            {errors.dob.message}
          </p>
        )}
        <Input
          {...register("location", {
            required: "Location is required",
            pattern: {
              value: /\S+,\s*\S+/,
              message: "Use format - City, Country",
            },
          })}
          placeholder='Location (City, Country)'
          fullWidth
          className={`${errors.location ? "mb-0" : "mb-4"}`}
        />
        {errors.location && (
          <p className='mb-4 indent-0.5 font-bold text-red-500'>
            {errors.location.message}
          </p>
        )}

        <Button
          type='submit'
          disabled={!isValid}
          className={`mt-7 ${!isValid ? "text-gray-400" : "hover:bg-slate-300 text-black "}`}
        >
          Next
        </Button>
      </form>
    </div>
  );
};

export default Form;
