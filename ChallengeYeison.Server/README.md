# Backend Documentation - ChallengeYeison

## Requisitos del Sistema

### Versiones Requeridas
- .NET Core SDK 7.0 o superior
- ASP.NET Core Runtime 7.0
- Visual Studio 2022 (recomendado) o Visual Studio Code

## Configuración Inicial

1. Clonar el repositorio:
```bash
git clone [URL_DEL_REPOSITORIO]
cd ChallengeYeison/ChallengeYeison.Server
```

2. Restaurar paquetes NuGet:
```bash
dotnet restore
```

3. Ejecutar el proyecto:
```bash
dotnet run
```

El servidor se iniciará en `https://localhost:7080` y `http://localhost:5080`

## Servicios Disponibles

### 1. Productos
- **GET** `/api/Producto/{id}`
  - Obtiene los detalles de un producto específico
  - Parámetros:
    - `id`: ID del producto (ej: MLA12345)

### 2. Reviews
- **GET** `/api/Review/{productId}`
  - Obtiene las reviews de un producto
  - Parámetros:
    - `productId`: ID del producto

### 3. Vendedores
- **GET** `/api/Seller/{id}`
  - Obtiene información del vendedor
  - Parámetros:
    - `id`: ID del vendedor

## Documentación Swagger

La documentación detallada de la API está disponible en:
- Swagger UI: `https://localhost:7080/swagger`
- Especificación OpenAPI: `https://localhost:7080/swagger/v1/swagger.json`

## Buenas Prácticas Implementadas

### 1. Arquitectura y Estructura
- Separación clara de responsabilidades (Controllers, Services, Models)
- Uso de inyección de dependencias
- Implementación de interfaces para servicios

### 2. Manejo de Datos
- Uso de DTOs para transferencia de datos
- Validación de modelos
- Manejo de datos mock en archivos JSON separados

### 3. Seguridad
- CORS configurado para desarrollo
- Validación de entradas
- Manejo seguro de respuestas HTTP

### 4. Performance
- Caché implementado para respuestas frecuentes
- Respuestas comprimidas
- Logging estructurado para monitoreo

### 5. Documentación
- Swagger/OpenAPI implementado
- Comentarios XML en controladores
- Documentación de endpoints

## Estructura de Archivos

```
ChallengeYeison.Server/
├── Controllers/
│   ├── ProductoController.cs
│   ├── ReviewController.cs
│   └── SellerController.cs
├── Services/
│   ├── ProductoService.cs
│   ├── ReviewService.cs
│   └── SellerService.cs
├── Models/
│   ├── Producto.cs
│   ├── Review.cs
│   └── Seller.cs
└── Data/
    ├── Producto.json
    ├── Review.json
    └── Seller.json
```

## Manejo de Errores

El sistema implementa un manejo de errores consistente:
- Códigos HTTP apropiados
- Mensajes de error descriptivos
- Logging de errores para debugging

## Endpoints Principales

### Producto
```http
GET /api/Producto/{id}
Response: 200 OK
{
  "id": "string",
  "title": "string",
  "price": 0,
  "seller": {
    "id": "string",
    "name": "string"
  }
  // ... más propiedades
}
```

### Reviews
```http
GET /api/Review/{productId}
Response: 200 OK
{
  "rating": {
    "average": 0,
    "totalReviews": 0
  },
  "reviews": [
    {
      "id": "string",
      "text": "string",
      "rating": 0,
      "date": "string"
    }
  ]
}
```

### Seller
```http
GET /api/Seller/{id}
Response: 200 OK
{
  "id": "string",
  "name": "string",
  "rating": 0,
  "sales": 0
}
```

## Monitoreo y Logs

El sistema utiliza logging estructurado con las siguientes características:
- Niveles de log configurables
- Información detallada de requests/responses
- Tracking de performance

## Ambiente de Desarrollo

Para desarrollo local:
1. Usar Visual Studio 2022 o VS Code
2. Instalar .NET Core SDK 7.0
3. Configurar los certificados HTTPS:
```bash
dotnet dev-certs https --trust
```

## Troubleshooting Común

### Problemas de Conexión
1. Verificar que los puertos 7080 y 5080 estén disponibles
2. Asegurar que los certificados HTTPS estén instalados
3. Revisar la configuración de CORS si se accede desde el frontend

### Errores de Datos
1. Verificar que los archivos JSON en la carpeta Data estén presentes
2. Validar el formato de los IDs en las peticiones
3. Revisar los logs para más detalles

## Contribución

Para contribuir al proyecto:
1. Crear un branch desde `main`
2. Seguir las convenciones de código establecidas
3. Documentar cambios en los comentarios
4. Crear un Pull Request con descripción detallada

## Funcionalidades Detalladas

### Productos
- Obtención detallada de productos por ID
- Información completa incluyendo:
  - Datos básicos (título, precio, stock)
  - Características técnicas
  - Imágenes en alta resolución
  - Estado del producto
  - Ubicación
  - Garantía
- Caché implementado para mejora de performance
- Validación de datos de entrada
- Manejo de productos no encontrados

### Reviews
- Sistema completo de reseñas
- Cálculo de promedios y estadísticas
- Filtrado por:
  - Puntuación
  - Fecha
  - Tipo de compra
- Paginación implementada
- Ordenamiento configurable
- Validación de datos

### Vendedores
- Perfil completo del vendedor
- Estadísticas de:
  - Ventas totales
  - Reputación
  - Tiempo en la plataforma
  - Métricas de envío
- Historial de ventas
- Nivel del vendedor
- Métricas de satisfacción

### Sistema de Caché
- Implementación de caché en memoria
- Políticas de expiración configurables
- Invalidación automática
- Caché distribuido disponible
- Métricas de hit/miss ratio

### Logging y Monitoreo
- Logging estructurado
- Niveles configurables
- Rotación de logs
- Métricas de performance
- Tracking de requests/responses
- Alertas configurables

## Testing Detallado

### Tests Unitarios
```bash
dotnet test --filter Category=Unit
```

#### Controllers
- **ProductoController**
  - Validación de rutas
  - Manejo de parámetros
  - Respuestas HTTP correctas
  - Manejo de errores

- **ReviewController**
  - Paginación correcta
  - Filtros funcionando
  - Validación de entrada
  - Cálculos de promedios

- **SellerController**
  - Obtención de perfiles
  - Cálculo de estadísticas
  - Manejo de vendedor no encontrado

#### Services
- **ProductoService**
  - Carga de datos
  - Transformación de modelos
  - Caché funcionando
  - Manejo de errores

- **ReviewService**
  - Filtrado correcto
  - Ordenamiento
  - Cálculos estadísticos
  - Validaciones

- **SellerService**
  - Cálculo de métricas
  - Transformación de datos
  - Validaciones de negocio

### Tests de Integración
```bash
dotnet test --filter Category=Integration
```

- Flujo completo de requests
- Persistencia de datos
- Caché funcionando
- Headers correctos
- Compresión de respuestas

### Tests de Performance
```bash
dotnet test --filter Category=Performance
```

- Tiempos de respuesta
- Uso de memoria
- Comportamiento bajo carga
- Eficiencia de caché
- Concurrencia

### Coverage
```bash
dotnet test /p:CollectCoverage=true /p:CoverletOutputFormat=opencover
```

Genera reportes detallados de:
- Cobertura de código
- Branches
- Métodos
- Líneas 