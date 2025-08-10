import { URL, fileURLToPath } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }

  return {
    plugins: [vue()],
    server: {
      port: 6969,
      host: true,
    },
    resolve: {
      alias: [
        {
          find: '~',
          replacement: fileURLToPath(new URL('./src', import.meta.url)),
        },
      ],
    },
    devtools: true,
  }
})
