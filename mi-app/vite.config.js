import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src'       // asumiendo que estás dentro de mi-app, '/src' ya apunta a mi-app/src
    }
  }
})