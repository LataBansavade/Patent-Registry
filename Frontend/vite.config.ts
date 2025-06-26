import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: './',
  plugins: [react()],
  server: {
    // Vite handles SPA fallback automatically in production
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      external: ['@reown/appkit/react'], // Add this line
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          ethers: ['ethers'],
          wagmi: ['wagmi', '@wagmi/core']
        }
      }
    }
  }
})