/// <reference types="vite/client" />

interface ImportMetaEnv {
  // General
  readonly VITE_API_URL: string

  // Deezer
  readonly VITE_DEEZER_APP_ID: string
  readonly VITE_DEEZER_SECRET_KEY: string
  readonly VITE_DEEZER_REDIRECT_URL: string
  readonly VITE_DEEZER_URL: string
  readonly VITE_DEEZER_AUTH_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}