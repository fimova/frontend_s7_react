import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/frontend_s7_react/',
  build: {
    outDir: 'docs', 
  },
})
