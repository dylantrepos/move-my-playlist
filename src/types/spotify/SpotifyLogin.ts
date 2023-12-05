export type SpotifyAccessTokenResponse = {
  "access_token": string;
  "expires_in": number
  "refresh_token": string;
  "scope": string;
  "token_type": string;
}

export type SpotifyAccessToken = {
  accessToken: string;
  expires: number
  tokenType: string;
  scope: string;
}