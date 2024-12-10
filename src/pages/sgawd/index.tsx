// ** React/Next.js Imports
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import React, { useEffect } from "react";

// ** Third-Party Imports
import type { Anthem } from "@prisma/client";

// ** Custom Components, Hooks, Utils, etc.
import { useSpotify } from "@/context/SpotifyContext";
import type { ArtistCatalog } from "@/types/catalog";
import AboutSection from "@/views/AboutSection";
import CardSection from "@/views/CardSection";
import WelcomeSection from "@/views/WelcomeSection";
import SpotifyAPI from "@lib/spotify";

// Fetch artist albums
const fetchAlbums = async (artistId: string): Promise<any[]> => {
  try {
    const response = await SpotifyAPI.artists.albums(
      artistId,
      undefined,
      undefined,
      50,
      0
    );
    return response.items;
  } catch (error) {
    console.error("Failed to fetch albums:", error);
    return [];
  }
};

// Fetch tracks for an album
const fetchTracks = async (albumId: string): Promise<any[]> => {
  try {
    const response = await SpotifyAPI.albums.tracks(albumId, undefined, 50, 0);
    return response.items;
  } catch (error) {
    console.error(`Failed to fetch tracks for album ${albumId}:`, error);
    return [];
  }
};

const removeDuplicateTracks = (tracks: any[]): any[] => {
  const uniqueTracks = new Map();

  tracks.forEach((track) => {
    const existingTrack = uniqueTracks.get(track.name);
    if (
      !existingTrack ||
      (existingTrack.album_type !== "album" && track.album_type === "album")
    ) {
      uniqueTracks.set(track.name, track);
    }
  });

  return Array.from(uniqueTracks.values());
};

export const getServerSideProps: GetServerSideProps<
  ArtistCatalog
> = async () => {
  try {
    // Get all tracks in an artist's catalog
    const artistId = "4ufHiOJK9tL0y3QfNwGJ6l";
    const artistName = "SGaWD";

    const albumsResponse = await fetchAlbums(artistId);
    const allTracks: Anthem[] = [];

    for (const album of albumsResponse) {
      const tracksResponse = await fetchTracks(album.id as string);

      // If the album contains a track that the artist appears on,
      // implement logic to select the track that the artist is featured on
      if (album.album_group === "appears_on" && tracksResponse.length > 1) {
        const featureTrack = tracksResponse.find((track) =>
          track.artists.some(
            (artist: { id: string; name: string }) =>
              artist.id === artistId && artist.name === artistName
          )
        );
        if (featureTrack) {
          allTracks.push({
            id: featureTrack.id,
            name: featureTrack.name,
            preview_url: featureTrack.preview_url,
            track_url: featureTrack.external_urls.spotify,
            artists: featureTrack.artists.map(
              (artist: { id: string; name: string }) => ({
                id: artist.id,
                name: artist.name,
              })
            ),
            images: album.images,
            album_name: album.name || "",
            album_type: album.album_type,
            album_group: album.album_group,
            release_date: album.release_date,
          });
        }
      } else {
        // For other albums, add track/album details to artist catalog
        tracksResponse.forEach((track) => {
          allTracks.push({
            id: track.id,
            name: track.name,
            preview_url: track.preview_url,
            track_url: track.external_urls.spotify,
            artists: track.artists.map(
              (artist: { id: string; name: string }) => ({
                id: artist.id,
                name: artist.name,
              })
            ),
            images: album.images,
            album_name: album.name || "",
            album_type: album.album_type,
            album_group: album.album_group,
            release_date: album.release_date,
          });
        });
      }
    }

    // Remove duplicate tracks, prioritizing album tracks
    const uniqueTracks = removeDuplicateTracks(allTracks);

    const artistCatalog: ArtistCatalog = {
      items: uniqueTracks,
    };

    return {
      props: artistCatalog,
    };
  } catch (e) {
    console.error(e);
    return {
      props: { items: [] },
    };
  }
};

const SGaWDDemo = ({
  items,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { setArtistCatalog } = useSpotify();

  useEffect(() => {
    const fetchData = async () => {
      const fetchedData: ArtistCatalog = { items };
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
