export type SpotifyExternalUrls = {
  spotify: string;
}

export type SpotifyImage = {
  url: string;
  height: number;
  width: number;
}

export type SpotifyRestrictions = {
  reason: string;
}

export type SpotifyArtist = {
  external_urls: SpotifyExternalUrls;
  followers: {
    href: string;
    total: number;
  };
  genres: string[];
  href: string;
  id: string;
  images: SpotifyImage[];
  name: string;
  popularity: number;
  type: string;
  uri: string;
}

export type SpotifyAlbum = {
  album_type: string;
  total_tracks: number;
  available_markets: string[];
  external_urls: SpotifyExternalUrls;
  href: string;
  id: string;
  images: SpotifyImage[];
  name: string;
  release_date: string;
  release_date_precision: string;
  restrictions: SpotifyRestrictions;
  type: string;
  uri: string;
  artists: SpotifyArtist[];
}

export type SpotifyExternalIds = {
  isrc: string;
  ean: string;
  upc: string;
}

export type SpotifyLinkedFrom = object

export type SpotifyTrack = {
  album: SpotifyAlbum;
  artists: SpotifyArtist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: SpotifyExternalIds;
  external_urls: SpotifyExternalUrls;
  href: string;
  id: string;
  is_playable: boolean;
  linked_from: SpotifyLinkedFrom;
  restrictions: SpotifyRestrictions;
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
  is_local: boolean;
  deezerUrl?: string;
  deezerId?: string;
}

export type SpotifyTrackUserInfo = {
  added_at: string,
  added_by: {
    external_urls: Record<string, string>;
    href: string;
    id: string;
    type: string;
    uri: string;
  },
  is_local: boolean,
  primary_color: string | null,
  track: SpotifyTrack,
  video_thumbnail: {
      "url": string | null
  }
}