import '@testing-library/jest-dom'

// Configuración global para todas las pruebas
beforeAll(() => {
    // Configuración global antes de todas las pruebas
})

afterAll(() => {
    // Limpieza global después de todas las pruebas
})

// Configuración de mock para fetch global si es necesario
global.fetch = vi.fn()

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