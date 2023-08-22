import { defineConfig } from 'vite'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    ViteImageOptimizer({ 
      png: { quality: 75 },
    }),
  ],
  server: {
    host: true,
    port: 3000,
    watch: {
      usePolling: true
    }
  }
});
