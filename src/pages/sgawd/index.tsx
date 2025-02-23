// ** React/Next.js Imports
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import React, { useEffect } from "react";

// ** Custom Components, Hooks, Utils, etc.
import { useSpotify } from "@/context/SpotifyContext";
import type { ArtistCatalog } from "@/types/catalog";
import { getArtistCatalog } from "@/utils/get-artist-catalog";
import AboutSection from "@/views/AboutSection";
import CardSection from "@/views/CardSection";
import WelcomeSection from "@/views/WelcomeSection";

export const getServerSideProps: GetServerSideProps<
  ArtistCatalog
> = async () => {
  const artistConfig = {
    artistId: "4ufHiOJK9tL0y3QfNwGJ6l",
    artistName: "SGaWD",
  };

  return {
    props: await getArtistCatalog(artistConfig),
  };
};

const SGaWDDemo = ({
  items = [],
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { setArtistCatalog } = useSpotify();

  useEffect(() => {
    const fetchData = async () => {
      const fetchedData: ArtistCatalog = { items: items || [] };
      setArtistCatalog(fetchedData);
    };

    fetchData();
  }, [items, setArtistCatalog]);

  return (
    <main>
      <div className='snap-y snap-mandatory h-screen w-screen overflow-scroll scrollbar-hide overflow-x-hidden'>
        <WelcomeSection />
        <AboutSection />
        <CardSection />
      </div>
    </main>
  );
};

export default SGaWDDemo;
