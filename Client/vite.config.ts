import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/

// De esta manera, accedemos a los .ENV por medio de "import.meta.env["VITE_URL_BACK_END"]"
// export default defineConfig({
//   plugins: [react()],
// })

/// De esta manera, accedemos al .ENV de la manera tradicional.
export default ({ mode }: { mode: string }) => {
  const env = loadEnv(mode, process.cwd());

  return defineConfig({
    plugins: [react()],
    define: { "process.env": { ...process.env, ...env, } },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, 'src'),
      }
    },
  });
};