import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd(), '') };

  return defineConfig({
    plugins: [react()],
    optimizeDeps: {
      exclude: ['@tanstack/react-query']
    },
    server: {
      proxy: {
        '/deezer-token': {
          target: 'https://connect.deezer.com/oauth/access_token.php',
          changeOrigin: true,
          secure: false,
        },
        '/spotify-token': {
          target: 'https://accounts.spotify.com/api/token',
          changeOrigin: true,
          secure: false,
        },
        '/deezer-api': {
          target: 'https://api.deezer.com/',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/deezer-api/, ''),
        },
        '/spotify-api': {
          target: 'https://api.spotify.com/v1/me/',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/spotify-api/, ''),
        },
      },
    },
  })
}
