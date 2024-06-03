import React, {
  createContext,
  ReactNode,
  useContext,
  useState,
  useMemo,
  useEffect
} from "react";
import type { ArtistCatalog } from "@/types/catalog";
import { debounce } from "lodash";

interface SpotifyContextType {
  artistCatalog: ArtistCatalog;
  setArtistCatalog: React.Dispatch<React.SetStateAction<ArtistCatalog>>;
}

const SpotifyContext = createContext<SpotifyContextType | undefined>(undefined);

export const useSpotify = () => {
  const context = useContext(SpotifyContext);
  if (!context) {
    throw new Error("useSpotify must be used within a SpotifyProvider");
  }
  return context;
};

interface SpotifyProviderProps {
  children: ReactNode;
}

export const SpotifyProvider: React.FC<SpotifyProviderProps> = ({ children }) => {
  // Initialize state from local storage if available
  const initialArtistCatalog = JSON.parse(localStorage.getItem('artistCatalog') || '{}');
  const [artistCatalog, setArtistCatalog] = useState<ArtistCatalog>(initialArtistCatalog);

  // Debounce the local storage update to improve performance
  const updateLocalStorage= debounce(() => {
    localStorage.setItem('artistCatalog', JSON.stringify(artistCatalog));
  }, 500);

  useEffect(() => {
    updateLocalStorage();
  }, [artistCatalog, updateLocalStorage]);

  const contextValue = useMemo(() => ({ artistCatalog, setArtistCatalog }), [artistCatalog, setArtistCatalog]);

  return (
    <SpotifyContext.Provider value={contextValue}>
      {children}
    </SpotifyContext.Provider>
  );
};
