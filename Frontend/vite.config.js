import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    host:'0.0.0.0',
    port: 4003, 
    watch: {
      usePolling: true
    }, 
  },
  plugins: [react()],
  resolve:{
    alias:{
      '@components': path.resolve(__dirname, './src/components'),
      '@styles': path.resolve(__dirname, './src/styles'), 
      '@hooks': path.resolve(__dirname, './src/Hooks'),
      '@adminPage': path.resolve(__dirname, './src/Pages/admin'), 
      '@clientPage': path.resolve(__dirname, './src/Pages/client'),
      '@pages': path.resolve(__dirname, './src/Pages'),
      '@adminStyles': path.resolve(__dirname, './src/styles/admin'),
      '@clientStyles': path.resolve(__dirname, './src/styles/client'),
    }
  }
})
