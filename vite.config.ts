import { defineConfig } from 'vite'

// @ts-ignore - vitest types will be available after installation
export default defineConfig(({ mode }) => ({
  // Dev (localhost:3000): base '/'. GitHub Pages (production build): base '/steamgirl/'.
  base: mode === 'production' ? '/steamgirl/' : '/',
  server: {
    port: 3000,
  },
  test: {
    globals: true,
    environment: 'node',
  },
}))
