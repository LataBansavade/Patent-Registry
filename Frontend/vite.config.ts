import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  base: './',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      external: [
        '@reown/appkit/react'
      ],
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          wagmi: ['wagmi', '@wagmi/core', 'viem']
        }
      }
    }
  }
})