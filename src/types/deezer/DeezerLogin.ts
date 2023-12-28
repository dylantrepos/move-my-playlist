// General
export type DeezerAccessToken = {
  accessToken: string;
  expires: number;
}

export type DeezerAccessTokenResponse = {
  "access_token": string;
  "expires": number;
  error?: DeezerErrorResponse
}

export type DeezerErrorResponse = {
  code: number;
  message: string;
  type: string;
}
