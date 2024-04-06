import React from "react";
import { GetStaticProps } from "next";
import SpotifyAPI from "@/lib/spotify";
import { ArtistCatalog } from "@/types/catalog";
import SpotifyAnthem from "@/components/SpotifyAnthem";

export const getStaticProps: GetStaticProps<{ artistCatalog: ArtistCatalog }> = async () => {
  // Fetch SGaWD's catalog
  const artistId = "4ufHiOJK9tL0y3QfNwGJ6l";
  const res = await SpotifyAPI.artists.albums(artistId, undefined, undefined, 50, 0);
  return { props: { artistCatalog: res } };
};

const anthem = ({ artistCatalog }: { artistCatalog: ArtistCatalog }) => {
  return( 
    <div>
      <SpotifyAnthem artistCatalog={artistCatalog} />
    </div>
  );
};

export default anthem;