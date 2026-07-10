import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

const env = loadEnv('', process.cwd());
const { VITE_HOST, VITE_PORT } = env;

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    host: VITE_HOST || 'localhost',
    port: Number(VITE_PORT) || 3000,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    css: true,
  },
})
