// ** React/Next.js Imports
import Image from "next/image";
import React, { useState, useEffect } from "react";

// ** Third-Party Imports
import { ToastContainer, toast } from "react-toastify";

// ** Custom Components, Hooks, Utils, etc.
import { api } from "@/utils/trpc";

const Home = () => {
  const { mutateAsync: waitlistEntry } = api.waitlist.add.useMutation();

  const [email, setEmail] = useState<string>();
  const [errorMessage, setErrorMessage] = useState<string>();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validation checks
    const emailRegex = /^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$/;

    if (!email || !emailRegex.test(email)) {
      setErrorMessage("Please enter a valid email address!");
      return;
    }
    
    if (email) {
      try {
        const res = await waitlistEntry({
          email: email,
        });

        setEmail('');
        setErrorMessage('');

        toast.success(res.message, {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "colored",
        });
      } catch (error) {
        console.error("Server error:", error);
      }
    }
  };

  useEffect(() => {
    // Error handling with react-toastify
    if (errorMessage) {
      toast.error(errorMessage, {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }

    // Reset error message
    setErrorMessage("");
  }, [errorMessage]);

  return (
    <main className='flex min-h-screen bg-black p-16'>
      <div className='flex flex-col w-1/2'>
        <div className='flex items-center mb-10 space-x-4'>
          <div className='w-10 h-10 rounded-full bg-white'></div>
          <div className='w-96 h-10 bg-white rounded-full'></div>
          <div className='w-48 h-10 bg-black border-4 border-white rounded-full'></div>
        </div>
        <h1 className='text-white text-9xl font-bold mb-8'>FanSync</h1>
        <div className='text-white text-3xl font-medium mt-6'>
          <p>A platform where you can take full</p>
          <p>control of your fanbase</p>
        </div>
        <form onSubmit={handleSubmit} method='POST' className='mt-32 max-w-sm'>
          <div className='flex flex-col gap-2 lg:flex-row'>
            <label className='sr-only' htmlFor='email-address'>
              Email address
            </label>
            <input
              className='text-accent-500 block h-10 w-full appearance-none px-4 py-2 placeholder-zinc-400 duration-200 focus:outline-none focus:ring-zinc-300 sm:text-sm'
              id='email-address'
              name='email'
              placeholder='johndoe@example.com'
              value={email}
              onChange={handleEmailChange}
            />
            <button
              className='flex h-10 shrink-0 items-center justify-center gap-2 border-2 border-[#E5E900] px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-[#E5E900] hover:text-black'
              type='submit'
            >
              <span>Join the waitlist</span>
            </button>
          </div>
        </form>
      </div>
      <div className='w-1/2 flex items-center justify-center'>
        <Image
          src='/images/home-page/image.png'
          alt='FanSync Home Image'
          width={650}
          height={650}
          style={{
            objectFit: "contain",
          }}
        />
      </div>
      <ToastContainer
          position='bottom-right'
          autoClose={1800}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable={false}
          pauseOnHover
          theme='colored'
        />
    </main>
  );
};

export default Home;
