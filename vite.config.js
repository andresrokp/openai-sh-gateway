import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root: './src/react-src',
  build:{
    outDir: '../../public/build-react3d'
  },
  base: '/build-react3d/'
})
