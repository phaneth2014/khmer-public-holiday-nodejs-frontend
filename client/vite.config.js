import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server:{
    port: 4000
  },
  build: {
    chunkSizeWarningLimit: 1000, // Set limit to 1000kB instead of 500kB
    assetsInlineLimit: 0, // Disable inlining of assets to avoid large chunks
  },
})
