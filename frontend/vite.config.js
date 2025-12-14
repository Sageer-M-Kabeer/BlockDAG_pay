import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),  
  ],
  server:{
    host:true,
    port: 5173,
    allowedHosts: ['c9572c108184.ngrok-free.app']
  },
  base:'/',
})
