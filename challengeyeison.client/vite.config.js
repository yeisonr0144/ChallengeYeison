import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],


    // Alias opcionales
    resolve: {
        alias: {
            '@': path.resolve('C:\\Users\\zebas\\OneDrive\\Documentos\\Meli\\ChallengeYeison\\challengeyeison.client\\src', './src'),
        },
    },
    // Configuración para desarrollo
    server: {
        port: 5173,
        proxy: {
            '/api': {
                target: 'https://localhost:5065', // tu backend en .NET Core
                changeOrigin: true,
                secure: false,
            },
        },
    },
})
