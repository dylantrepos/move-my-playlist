export type SpotifyAccessToken = {
  "access_token": string;
  "expires_in": number
  "refresh_token": string;
  "scope": string;
  "token_type": string;
  "error"?: SpotifyError;
}

export type SpotifyErrorResponse = {
  error: SpotifyError;
}

export type SpotifyError = {
  status: number;
  message: string;
}

