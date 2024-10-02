// ** React/Next.js Imports
import type { AppProps } from "next/app";
import React from "react";

import { ThemeProvider, GlobalStyle } from "@react95/core";

import { Analytics } from "@vercel/analytics/react";

// ** React95 Imports

// ** Custom Components, Hooks, Utils, etc.
import Meta from "@/components/Meta";
import { FormDataProvider } from "@/context/FormDataContext";
import { LicenseProvider } from "@/context/LicenseContext";
import { SpotifyProvider } from "@/context/SpotifyContext";
import { api } from "@/utils/trpc";

// ** Styles
import "@/styles/globals.css";
import "@react95/icons/icons.css";
import 'react-toastify/dist/ReactToastify.css';

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Meta />
      <Analytics />
      <ThemeProvider theme={"blackAndWhite"}>
        <GlobalStyle />
        <FormDataProvider>
          <LicenseProvider>
            <SpotifyProvider>
              <div className='overflow-x-hidden'>
                <Component {...pageProps} />
              </div>
            </SpotifyProvider>
          </LicenseProvider>
        </FormDataProvider>
      </ThemeProvider>
    </>
  );
}

export default api.withTRPC(App);
