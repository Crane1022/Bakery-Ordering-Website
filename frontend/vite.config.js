import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/Bakery-Website/',
  plugins: [
    vue(),
    tailwindcss(),
  ],
})

