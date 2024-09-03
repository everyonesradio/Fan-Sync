import "@/styles/globals.css";
import "@react95/icons/icons.css";
import type { AppProps } from "next/app";
import { ThemeProvider, GlobalStyle } from "@react95/core";
import { LicenseProvider } from "@/context/LicenseContext";
import { SpotifyProvider } from "@/context/SpotifyContext";
import Meta from "@/components/Meta";
import { Analytics } from "@vercel/analytics/react";
import { ImageProvider } from "@/context/ImageContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Meta />
      <Analytics />
      <ThemeProvider theme={"blackAndWhite"}>
        <GlobalStyle />
        <ImageProvider>
          <LicenseProvider>
            <SpotifyProvider>
              <div className='overflow-x-hidden'>
                <Component {...pageProps} />
              </div>
            </SpotifyProvider>
          </LicenseProvider>
        </ImageProvider>
      </ThemeProvider>
    </>
  );
}
