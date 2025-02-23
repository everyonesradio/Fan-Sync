// ** Third-Party Imports
import type { Anthem } from "@prisma/client";

// ** Custom Components, Hooks, Utils, etc.
import type { ArtistCatalog } from "@/types/catalog";
import SpotifyAPI from "@lib/spotify";

interface ArtistConfig {
  artistId: string;
  artistName: string;
}

interface SimplifiedAlbum {
  id: string;
  name: string;
  album_type: string;
  album_group: string;
  release_date: string;
  images: {
    url: string;
    height: number;
    width: number;
  }[];
  artists: SimplifiedArtist[];
  external_urls: {
    spotify: string;
  };
}

interface SpotifyTrack {
  album: SimplifiedAlbum | null;
  id: string;
  name: string;
  preview_url: string | null;
  external_urls: {
    spotify: string;
  };
  artists: SimplifiedArtist[];
}

interface SimplifiedArtist {
  id: string;
  name: string;
  external_urls: {
    spotify: string;
  };
}

// Fetch artist albums
const fetchAlbums = async (artistId: string): Promise<SimplifiedAlbum[]> => {
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
const fetchTracks = async (albumId: string): Promise<SpotifyTrack[]> => {
  try {
    const response = await SpotifyAPI.albums.tracks(albumId, undefined, 50, 0);
    const albumDetails = await SpotifyAPI.albums.get(albumId);
    const simplifiedAlbum: SimplifiedAlbum = {
      id: albumDetails.id,
      name: albumDetails.name,
      album_type: albumDetails.album_type,
      album_group: "album",
      release_date: albumDetails.release_date,
      images: albumDetails.images,
      artists: albumDetails.artists,
      external_urls: albumDetails.external_urls,
    };
    return response.items.map((track) => ({
      ...track,
      album: simplifiedAlbum,
    }));
  } catch (error) {
    console.error(`Failed to fetch tracks for album ${albumId}:`, error);
    return [];
  }
};

const removeDuplicateTracks = (tracks: SpotifyTrack[]): SpotifyTrack[] => {
  const uniqueTracks = new Map<string, SpotifyTrack>();

  tracks.forEach((track) => {
    const existingTrack = uniqueTracks.get(track.name);
    if (
      !existingTrack ||
      (existingTrack.album?.album_type !== "album" &&
        track.album?.album_type === "album")
    ) {
      uniqueTracks.set(track.name, track);
    }
  });
  return Array.from(uniqueTracks.values());
};

export const getArtistCatalog = async (
  config: ArtistConfig
): Promise<ArtistCatalog> => {
  const { artistId, artistName } = config;

  try {
    const albumsResponse = await fetchAlbums(artistId);
    const allTracks: SpotifyTrack[] = [];

    for (const album of albumsResponse) {
      const tracksResponse = await fetchTracks(album.id);

      if (album.album_group === "appears_on" && tracksResponse.length > 1) {
        const featureTrack = findFeatureTrack(
          tracksResponse,
          artistId,
          artistName
        );
        if (featureTrack) {
          allTracks.push(featureTrack);
        }
      } else {
        allTracks.push(...tracksResponse);
      }
    }

    const uniqueTracks = removeDuplicateTracks(allTracks);
    const anthems: Anthem[] = uniqueTracks
      .map((track) =>
        track.album ? createTrackObject(track, track.album) : null
      )
      .filter((anthem): anthem is Anthem => anthem?.preview_url !== null);
    return { items: anthems };
  } catch (error) {
    console.error("Failed to fetch artist catalog:", error);
    return { items: [] };
  }
};

const findFeatureTrack = (
  tracks: SpotifyTrack[],
  artistId: string,
  artistName: string
) => {
  return tracks.find((track) =>
    track.artists.some(
      (artist) => artist.id === artistId && artist.name === artistName
    )
  );
};

const createTrackObject = (
  track: SpotifyTrack,
  album: SimplifiedAlbum
): Anthem => ({
  id: track.id,
  name: track.name,
  preview_url: track.preview_url,
  track_url: track.external_urls.spotify,
  artists: track.artists.map((artist) => ({
    id: artist.id,
    name: artist.name,
  })),
  images: album.images,
  album_name: album.name || "",
  album_type: album.album_type,
  album_group: album.album_group,
  release_date: album.release_date,
});
