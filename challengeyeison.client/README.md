# Frontend Documentation - ChallengeYeison

## Requisitos del Sistema

### Versiones Requeridas
- Node.js 18.0 o superior
- npm 9.0 o superior
- Vite 4.0 o superior
- React 18.0

## Configuración Inicial

1. Clonar el repositorio:
```bash
git clone [URL_DEL_REPOSITORIO]
cd ChallengeYeison/challengeyeison.client
```

2. Instalar dependencias:
```bash
npm install
```

3. Ejecutar en modo desarrollo:
```bash
npm run dev
```

La aplicación se iniciará en `http://localhost:5173`

## Características Implementadas

### 1. Diseño y UI
- Interfaz tipo Mercado Libre
- Diseño responsive
- Componentes reutilizables
- Tailwind CSS para estilos

### 2. Funcionalidades Principales
- Visualización de productos
- Sistema de reviews
- Carrito de compras
- Sistema de favoritos
- Preguntas y respuestas

### 3. Estado Global
- Context API para manejo de estado
- Persistencia en localStorage
- Notificaciones toast

## Estructura de Componentes

```
src/
├── components/
│   ├── common/
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── Toast.jsx
│   │   └── ...
│   └── productDetail/
│       ├── ProductDetail.jsx
│       ├── ImageGallery.jsx
│       ├── ProductReviews.jsx
│       └── ...
├── context/
│   ├── CartContext.jsx
│   └── FavoritesContext.jsx
├── hooks/
│   └── useProduct.js
├── pages/
│   └── ProductPage.jsx
└── styles/
    ├── meli.css
    └── ...
```

## Hooks Personalizados

### useProduct
```javascript
const { product, seller, reviews, loading, error } = useProduct(productId);
```
- Maneja la obtención de datos del producto
- Gestiona estados de carga y error
- Incluye datos del vendedor y reviews

### useCart
```javascript
const { cartCount, addToCart } = useCart();
```
- Gestiona el estado del carrito
- Persiste datos en localStorage
- Proporciona funciones de manipulación

### useFavorites
```javascript
const { favorites, toggleFavorite, isFavorite } = useFavorites();
```
- Maneja la lista de favoritos
- Muestra notificaciones toast
- Persiste en localStorage

## Buenas Prácticas Implementadas

### 1. Arquitectura
- Componentes modulares
- Separación de responsabilidades
- Custom hooks para lógica reutilizable

### 2. Performance
- Lazy loading de componentes
- Optimización de re-renders
- Memoización cuando necesario

### 3. Estado
- Context API para estado global
- Estados locales cuando apropiado
- Persistencia en localStorage

### 4. UI/UX
- Feedback visual inmediato
- Notificaciones toast
- Loaders durante carga
- Manejo de errores amigable

### 5. Código
- ESLint para consistencia
- PropTypes para validación
- Comentarios descriptivos
- Nombres semánticos

## Integración con Backend

### Configuración de API
```javascript
// src/api/axiosInstance.js
const BASE_URL = 'https://localhost:7080/api';
```

### Endpoints Utilizados
- GET `/api/Producto/{id}`
- GET `/api/Review/{productId}`
- GET `/api/Seller/{id}`

## Testing

Para ejecutar los tests:
```bash
npm run test
```

### Tipos de Tests
- Tests unitarios de componentes
- Tests de integración
- Tests de hooks personalizados

## Scripts Disponibles

```bash
npm run dev      # Inicia servidor de desarrollo
npm run build    # Construye para producción
npm run preview  # Preview de build
npm run test     # Ejecuta tests
npm run lint     # Ejecuta ESLint
```

## Troubleshooting Común

### Problemas de Instalación
1. Limpiar caché de npm
```bash
npm cache clean --force
```
2. Eliminar node_modules y reinstalar
```bash
rm -rf node_modules
npm install
```

### Errores Comunes
1. CORS: Verificar configuración del backend
2. 404: Validar rutas y endpoints
3. Estado: Revisar Context Providers

## Contribución

Para contribuir:
1. Crear branch desde `main`
2. Seguir guías de estilo
3. Documentar cambios
4. Crear Pull Request

## Funcionalidades Detalladas

### Visualización de Productos
- Galería de imágenes con zoom y navegación
- Información detallada del producto (precio, stock, características)
- Descripción completa del producto
- Indicador de disponibilidad
- Botón de compra y añadir al carrito
- Botón de favoritos con animación

### Sistema de Reviews
- Puntuación promedio con estrellas
- Lista de reviews ordenadas por fecha
- Filtros por puntuación
- Indicador de compra verificada
- Paginación de reviews

### Carrito de Compras
- Contador en el header
- Persistencia de productos en localStorage
- Gestión de cantidades
- Cálculo automático de totales
- Animación al agregar productos
- Notificaciones toast de confirmación

### Sistema de Favoritos
- Toggle de productos favoritos
- Persistencia en localStorage
- Notificaciones toast al agregar/quitar
- Indicador visual en productos
- Sincronización entre pestañas

### Preguntas y Respuestas
- Listado de preguntas ordenadas cronológicamente
- Botones de temas sugeridos
- Campo de búsqueda de preguntas
- Formulario para realizar preguntas
- Botón de denuncia en preguntas
- Fecha de la pregunta/respuesta

### Información del Vendedor
- Tarjeta de vendedor con estadísticas
- Nivel y reputación del vendedor
- Historial de ventas
- Tiempo en Mercado Libre
- Métricas de ventas y envíos

### UI/UX
- Diseño responsive para todas las pantallas
- Skeleton loaders durante la carga
- Animaciones suaves en interacciones
- Mensajes de error amigables
- Tooltips informativos
- Breadcrumbs de navegación

## Testing Detallado

### Tests Unitarios
```bash
npm run test:unit
```

#### Componentes Testeados
- **Header.jsx**
  - Renderizado correcto del logo
  - Funcionamiento del contador del carrito
  - Navegación del menú

- **ProductDetail.jsx**
  - Carga correcta de datos del producto
  - Manejo de estados de carga
  - Funcionamiento de botones de compra
  - Integración con el carrito

- **ImageGallery.jsx**
  - Navegación entre imágenes
  - Funcionamiento del zoom
  - Carga lazy de imágenes

- **Reviews.jsx**
  - Cálculo correcto de promedios
  - Filtrado de reviews
  - Paginación

#### Hooks Testeados
- **useProduct.js**
  - Fetching de datos
  - Manejo de errores
  - Estados de carga

- **useCart.js**
  - Agregar/quitar productos
  - Persistencia en localStorage
  - Cálculo de totales

- **useFavorites.js**
  - Toggle de favoritos
  - Persistencia
  - Notificaciones

### Tests de Integración
```bash
npm run test:integration
```

- Flujo completo de compra
- Interacción entre componentes
- Persistencia de datos
- Navegación entre páginas

### Tests E2E
```bash
npm run test:e2e
```

- Flujos completos de usuario
- Pruebas en diferentes navegadores
- Validación de responsive design

### Coverage
```bash
npm run test:coverage
```

Genera un reporte detallado de la cobertura de tests en:
- Statements
- Branches
- Functions
- Lines
