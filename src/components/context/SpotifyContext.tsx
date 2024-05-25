import React, {
  createContext,
  ReactNode,
  useContext,
  useState,
  useMemo,
} from "react";
import type { ArtistCatalog } from "@/types/catalog";

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

export const SpotifyProvider: React.FC<SpotifyProviderProps> = ({
  children,
}) => {
  const [artistCatalog, setArtistCatalog] = useState<ArtistCatalog>({
    items: [],
  });

  const contextValue = useMemo(
    () => ({ artistCatalog, setArtistCatalog }),
    [artistCatalog, setArtistCatalog]
  );

  return (
    <SpotifyContext.Provider value={contextValue}>
      {children}
    </SpotifyContext.Provider>
  );
};
