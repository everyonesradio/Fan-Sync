import '@/styles/globals.css';
import '@react95/icons/icons.css';
import type { AppProps } from 'next/app';
import { ThemeProvider, GlobalStyle } from '@react95/core';
import { LicenseProvider } from '@/components/context/LicenseContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={'blackAndWhite'}>
      <GlobalStyle />
      <LicenseProvider>
        <Component {...pageProps} />
      </LicenseProvider>
    </ThemeProvider>
  );
}
