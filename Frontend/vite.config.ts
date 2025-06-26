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
        '@reown/appkit/react',
        'ethers',
        'ethers/providers',
        'wagmi',
        '@wagmi/core'
      ],
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