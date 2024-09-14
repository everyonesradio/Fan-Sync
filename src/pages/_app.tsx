// ** React/Next.js Imports
import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react";

// ** React95 Imports
import { ThemeProvider, GlobalStyle } from "@react95/core";

// ** Custom Components, Hooks, Utils, etc.
import Meta from "@/components/Meta";
import { LicenseProvider } from "@/context/LicenseContext";
import { SpotifyProvider } from "@/context/SpotifyContext";
import { FormDataProvider } from "@/context/FormDataContext";
import { api } from "@/utils/trpc";

// ** Styles
import "@/styles/globals.css";
import "@react95/icons/icons.css";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Meta />
      <Analytics />
      <ThemeProvider theme={"blackAndWhite"}>
        <GlobalStyle />
        <LicenseProvider>
          <SpotifyProvider>
            <div className='overflow-x-hidden'>
              <Component {...pageProps} />
            </div>
          </SpotifyProvider>
        </LicenseProvider>
      </ThemeProvider>
    </>
  );
}

export default api.withTRPC(App);
