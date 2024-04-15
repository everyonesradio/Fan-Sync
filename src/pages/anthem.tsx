import React from "react";
import { GetStaticProps } from "next";
import SpotifyAPI from "@/lib/spotify";
import { ArtistCatalog } from "@/types/catalog";
import SpotifyAnthem from "@/components/SpotifyAnthem";

// Fetch artist albums
const fetchAlbums = async (artistId: string): Promise<any[]> => {
  try {
     const response = await SpotifyAPI.artists.albums(artistId, undefined, undefined, 50, 0);
     return response.items;
  } catch (error) {
     console.error("Failed to fetch albums:", error);
     return [];
  };
 };
 
 // Fetch tracks for an album
const fetchTracks = async (albumId: string): Promise<any[]> => {
  try {
     const response = await SpotifyAPI.albums.tracks(albumId, undefined, 50, 0);
     return response.items;
  } catch (error) {
     console.error(`Failed to fetch tracks for album ${albumId}:`, error);
     return [];
  };
 };

export const getStaticProps: GetStaticProps<{ artistCatalog: ArtistCatalog }> = async () => {
  // Get all tracks in an artist's catalog
  const artistId = "4ufHiOJK9tL0y3QfNwGJ6l";
  const artistName = "SGaWD";

  const albumsResponse = await fetchAlbums(artistId);
  let allTracks: any[] = [];
  
  for (const album of albumsResponse) {
    const tracksResponse = await fetchTracks(album.id);

    // If the album contains a track that the artist appears on,
    // implement logic to select the track that the artist is featured on
    if (album.album_group === 'appears_on' && tracksResponse.length > 1) {
      const featureTrack = tracksResponse.find(track =>
          track.artists.some((artist: { id: string; name: string; }) => artist.id === artistId && artist.name === artistName)
      );
      if (featureTrack) {
          allTracks.push({
            id: featureTrack.id,
            name: featureTrack.name,
            preview_url: featureTrack.preview_url,
            track_url: featureTrack.external_urls.spotify,
            artists: featureTrack.artists.map((artist: { id: any; name: any; }) => ({
              id: artist.id,
              name: artist.name,
            })),
            images: album.images,
            album_type: album.album_type,
            album_group: album.album_group,
            release_date: album.release_date,
          });
      }
    } else {
      // For other albums, add track/album details to artist catalog
      tracksResponse.forEach(track => {
          allTracks.push({
            id: track.id,
            name: track.name,
            preview_url: track.preview_url,
            track_url: track.external_urls.spotify,
            artists: track.artists.map((artist: { id: any; name: any; }) => ({
              id: artist.id,
              name: artist.name,
            })),
            images: album.images,
            album_type: album.album_type,
            album_group: album.album_group,
            release_date: album.release_date,
          });
      });
    }
  };

  const artistCatalog: ArtistCatalog = {
    items: allTracks,
  };

  return { props: { artistCatalog } };
};

const Anthem: React.FC<{ artistCatalog: ArtistCatalog }> = ({ artistCatalog }) => {
  return( 
    <div>
      <SpotifyAnthem artistCatalog={artistCatalog} />
    </div>
  );
};

export default Anthem;