export type DeezerPlaylistTracks = {
  checksum: string;
  data: DeezerTrack[];
  next?: string;
  prev?: string;
  total: number;
  loaded: boolean;
}

export type DeezerTrack = {
  id: number;
  readable: boolean;
  title: string;
  "title_short": string;
  "title_version": string;
  isrc: string;
  link: string;
  duration: number;
  rank: number;
  "explicit_lyrics": boolean;
  "explicit_content_lyrics": number;
  "explicit_content_cover": number;
  preview: "";
  md5_image: "3f44e701b308c46fe63c116f1063cae1";
  time_add: number;
  artist: DeezerTrackArtist;
  album: DeezerTrackAlbum;
  type: "track";
  spotifyUrl?: string;
  spotifyId?: string;
}

export type DeezerTrackArtist = {
  id: number;
  name: string;
  link: string;
  picture: string;
  'picture_small': string;
  'picture_medium': string;
  'picture_big': string;
  'picture_xl': string;
  tracklist: string;
  type: string;
} 

export type DeezerTrackAlbum = {
  id: number,
  title: string;
  cover: string;
  'cover_small': string;
  'cover_medium': string;
  'cover_big': string;
  'cover_xl': string;
  'md5_image': string;
  tracklist: string;
  type: string;
} 