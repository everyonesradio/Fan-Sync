import React from "react";
import { useSpotify } from "@/components/context/SpotifyContext";
import SpotifyAnthem from "@/components/SpotifyAnthem";

const Anthem: React.FC = () => {
  const { artistCatalog } = useSpotify();

  return (
    <div>
      <SpotifyAnthem artistCatalog={artistCatalog} />
    </div>
  );
};

export default Anthem;
