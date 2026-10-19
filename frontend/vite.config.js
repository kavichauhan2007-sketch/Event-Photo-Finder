import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true, // Listen on all network interfaces including IPv4 (127.0.0.1) and IPv6 (::1)
    port: 5173,
    strictPort: true,
  },
})
