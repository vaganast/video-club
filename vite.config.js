import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    //set proxy for cors issue
    proxy: {
      '/api': {
        target: 'http://3.235.214.44:8000',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ''),
      },
    },
    port: 3000,
  },
});
