import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'redux': 'redux/dist/redux.js', // Ruta al módulo de Redux
      'react-redux': 'react-redux/dist/react-redux.js', // Ruta al módulo de React-Redux
    },
  },
});