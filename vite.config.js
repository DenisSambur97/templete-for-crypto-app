import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import ViteEnvPlugin from 'vite-plugin-env';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), ViteEnvPlugin(),],
})
