import { createContext, useContext, useState } from 'react';

interface LicenseContextValue {
  licenseID: string | null;
  setLicenseID: (licenseID: string) => void;
}

interface LicenseProviderProps {
  children: React.ReactNode;
}

const LicenseContext = createContext<LicenseContextValue>({
  licenseID: null,
  setLicenseID: () => {},
});

export const useLicense = () => useContext(LicenseContext);

export const LicenseProvider: React.FC<LicenseProviderProps> = ({ children }) => {
  const [licenseID, setLicenseID] = useState<string | null>(null);

  return (
    <LicenseContext.Provider value={{ licenseID, setLicenseID }}>
      {children}
    </LicenseContext.Provider>
  );
};