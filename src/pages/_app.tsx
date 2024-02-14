import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { LicenseProvider } from '@/components/context/LicenseContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <LicenseProvider>
      <Component {...pageProps} />
    </LicenseProvider>
  );

}
