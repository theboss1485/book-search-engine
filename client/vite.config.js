import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/* https://vitejs.dev/config/
This file configures vite, so as to make the server run on port 3000, and graphql run on 
port 3001*/
export default defineConfig({

    plugins: [react()],
    server: {

        port: 3000,
        open: true,
        proxy: {

            '/graphql': {
                
                target: 'http://localhost:3001',
                secure: false,
                changeOrigin: true
            }
        }
    }
})
