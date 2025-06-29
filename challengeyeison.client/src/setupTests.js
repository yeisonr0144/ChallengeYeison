import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Configuración global para todas las pruebas
beforeAll(() => {
    // Configuración global antes de todas las pruebas
})

afterAll(() => {
    // Limpieza global después de todas las pruebas
})

// Mock global fetch
global.fetch = vi.fn()

// Limpiar todos los mocks después de cada test
afterEach(() => {
  vi.clearAllMocks()
})

// Silenciar warnings específicos de testing-library si es necesario
const originalError = console.error
beforeAll(() => {
    console.error = (...args) => {
        if (/Warning.*not wrapped in act/.test(args[0])) {
            return
        }
        originalError.call(console, ...args)
    }
}) 