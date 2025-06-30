import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],

    // Alias opcionales
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    // Configuración para desarrollo
    server: {
        port: 5173,
        proxy: {
            '/api': {
                target: 'http://localhost:5065', // tu backend en .NET Core
                changeOrigin: true,
                secure: false,
            },
        },
    },
    // Configuración para testing
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: ['./src/setupTests.js'],
        css: true,
        coverage: {
            provider: 'v8',
            enabled: true,
            reporter: ['text', 'text-summary', 'html'],
            reportsDirectory: './coverage',
            exclude: [
                'node_modules/',
                'src/setupTests.js',
                '**/*.test.{js,jsx}',
                '**/*.spec.{js,jsx}',
                '**/*.d.ts',
            ],
            branches: 80,
            functions: 80,
            lines: 80,
            statements: 80,
            perFile: true,
            all: true,
            clean: true,
            skipFull: false,
            extension: ['.js', '.jsx'],
            include: ['src/**/*.{js,jsx}'],
            reportOnce: true
        },
    },
})
