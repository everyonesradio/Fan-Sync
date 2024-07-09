import "@/styles/globals.css";
import "@react95/icons/icons.css";
import type { AppProps } from "next/app";
import { ThemeProvider, GlobalStyle } from "@react95/core";
import { LicenseProvider } from "@/components/context/LicenseContext";
import { SpotifyProvider } from "@/components/context/SpotifyContext";
import Meta from "@/components/Meta";
import { Analytics } from "@vercel/analytics/react";

export default function App({ Component, pageProps }: AppProps) {
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
