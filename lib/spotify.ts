import { SpotifyApi } from "@spotify/web-api-ts-sdk";

const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
const clientSecret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET;

if (!clientId || !clientSecret) {
  throw new Error("SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET must be set");
}

// Create the api object with the credentials
const spotifyAPI = SpotifyApi.withClientCredentials(clientId, clientSecret);

export default spotifyAPI;
