import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // ganti dari react-swc

export default defineConfig({
  plugins: [react()],
})
