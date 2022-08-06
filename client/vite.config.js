import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const isDevEnv = mode === 'development';
  
  return {
    plugins: [react()]
  }
})

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()]
// })
