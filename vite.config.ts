import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'pdf-inline-headers',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url?.toLowerCase().endsWith('.pdf')) {
            res.setHeader('Content-Disposition', 'inline');
          }
          next();
        });
      },
    } as Plugin,
  ],
  base: '/',
})
