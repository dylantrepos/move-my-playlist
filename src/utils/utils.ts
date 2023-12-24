import { fetchAllSpotifyTrackId } from "../services/spotifyApi";
import { DeezerTrack } from "../types/deezer/DeezerPlaylistTracks";

export const generateCodeChallenge = async (codeVerifier: string) => {
  const data = new TextEncoder().encode(codeVerifier);
  const digest = await window.crypto.subtle.digest('SHA-256', data);
  return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
}

export const generateCodeVerifier = (length: number) => {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

export const openPopup = (url: string) => {
  const currHeight = window.innerHeight
  const currWidth = window.innerWidth

  console.log({url});
  const windowOpener = open(url, '_blank', `width=${currWidth},height=${currHeight},left=0,top=0`);

  return windowOpener;
}

type HandleCheckTracksFoundProps = {
  tracksFound: string[];
  tracksNotFound: DeezerTrack[];
}

export const getExistingTracksFromSpotify = async (tracks: DeezerTrack[]): Promise<HandleCheckTracksFoundProps> => {
  const spotifyTracksResults = await fetchAllSpotifyTrackId(tracks);
  let [tracksFound, tracksNotFound]: [string[], DeezerTrack[]] = [[], []];

  if (spotifyTracksResults) {
    tracksFound = spotifyTracksResults
      .filter((track) => track?.spotifyId)
      .map((track) => `spotify:track:${track.spotifyId}`);
    tracksNotFound = spotifyTracksResults.filter((track) => !track?.spotifyId);
  }
  return {tracksFound, tracksNotFound};
}