/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Deezer
  readonly VITE_DEEZER_APP_ID: string
  readonly VITE_DEEZER_SECRET_KEY: string
  readonly VITE_DEEZER_REDIRECT_URL: string
  
  // Spotify
  readonly VITE_SPOTIFY_APP_ID: string
  readonly VITE_SPOTIFY_SECRET_KEY: string
  readonly VITE_SPOTIFY_REDIRECT_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}