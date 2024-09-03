import { createContext, useContext, useState, useEffect, useMemo } from "react";

interface ImageUrlContextType {
  imageUrl: string;
  setImageUrl: (imageUrl: string) => void;
}

interface ImageProviderProps {
  children: React.ReactNode;
}

const ImageUrlContext = createContext<ImageUrlContextType>({
  imageUrl: "",
  setImageUrl: () => {},
});

export const useImageContext = () => useContext(ImageUrlContext);

export const ImageProvider: React.FC<ImageProviderProps> = ({ children }) => {
  const [imageUrl, setImageUrl] = useState<string>("");

  const imgUrlMemoized = useMemo(
    () => ({ imageUrl, setImageUrl }),
    [imageUrl, setImageUrl]
  );

  return (
    <ImageUrlContext.Provider value={imgUrlMemoized}>
      {children}
    </ImageUrlContext.Provider>
  );
};
