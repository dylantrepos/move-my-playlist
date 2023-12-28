// General
export type DeezerAccessToken = {
  "access_token": string;
  "expires": number;
}

export type DeezerErrorResponse = {
  code: number;
  message: string;
  type: string;
}
