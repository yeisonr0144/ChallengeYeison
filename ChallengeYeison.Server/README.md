# Backend Documentation - ChallengeYeison

# Reporte Técnico del Challenge - Página de Detalles de Producto

## 1. Opciones de Diseño

Durante el desarrollo del frontend de la aplicación, tomé decisiones centradas en la **usabilidad**, la **escalabilidad del código** y la **experiencia del usuario** en diferentes dispositivos. Utilicé como principal referencia el sitio de Mercado Libre Colombia, adaptando su estilo a un enfoque personalizado y modular.

### Estructura del Header

Dividí el header en dos filas principales:

- **Primera fila**: incluye el logo, el buscador y un banner.
- **Segunda fila**: muestra la ubicación, los enlaces de navegación y accesos rápidos a la cuenta del usuario.

Esta estructura con tres columnas (15% - 50% - 35%) permite una jerarquía visual clara y mejora la navegación.

### Responsive Design

Implementé un diseño responsivo usando **Flexbox**, **Tailwind CSS** y **media queries**. En pantallas pequeñas:

- Se ocultan elementos secundarios.
- Se muestra un menú hamburguesa alineado a la izquierda, siguiendo el comportamiento del sitio original.

### Componentización

Separé la interfaz en componentes reutilizables como:

- `Header`
- `ProductDetail`
- `ImageGallery`

Esto facilita la escalabilidad, el mantenimiento del código y permite realizar pruebas unitarias enfocadas.

### Pruebas y Control de Calidad

Utilicé **Vitest** y **Testing Library** para validar:

- La correcta renderización de los componentes.
- Diferentes estados del producto.
- Funcionalidades como "agregar al carrito" o "marcar como favorito".

---

## 2. Desafíos Enfrentados y Cómo los Abordé

### Desalineación en dispositivos móviles

En los primeros intentos, algunos elementos se desbordaban o centraban incorrectamente. Para solucionarlo:

- Ajusté el uso de `flex` y `grid`.
- Incorporé clases como `hidden`, `flex-col` y utilicé proporciones precisas con Tailwind CSS.

### Sincronización entre componentes

Tuve que mantener la sincronía entre `ProductDetail` e `ImageGallery`, especialmente al cambiar de estilo (variant). Resolví esto pasando props de forma controlada para que el estado del estilo afectara directamente a la galería.

### Pruebas con errores por estados asincrónicos

Durante las pruebas unitarias:

- Algunos errores surgieron por no envolver operaciones en `act(...)`.
- Otros fallaban por carga incompleta de datos.

Usé `waitFor` y mocks bien estructurados para simular correctamente el comportamiento esperado.

### Problemas con íconos y estilos no cargados

Detecté que algunos íconos no se mostraban debido a:

- Rutas incorrectas
- Clases faltantes o mal aplicadas

Solucioné esto verificando los imports y añadiendo lógica condicional de renderizado.

---

## 3. Conclusión

Este proyecto fue desarrollado aplicando buenas prácticas modernas de desarrollo frontend:

- **Diseño responsivo**
- **Componentes reutilizables**
- **Pruebas automatizadas**
- **Código limpio y mantenible**

Los desafíos superados permitieron fortalecer la calidad general del proyecto y asegurar una mejor experiencia de usuario.




## Requisitos del Sistema

### Versiones Requeridas
- .NET Core SDK 7.0 o superior
- ASP.NET Core Runtime 7.0
- Visual Studio 2022 (recomendado) o Visual Studio Code

## Configuración Inicial

1. Clonar el repositorio:
```bash
git clone https://github.com/yeisonr0144/ChallengeYeison
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

El servidor se iniciará en `https://localhost:5173` y `http://localhost:5065`

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
1. Verificar que los puertos 5173 y 5065 estén disponibles
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


## Testing Detallado

### Coverage
```bash
dotnet test /p:CollectCoverage=true /p:CoverletOutputFormat=opencover
```

Genera reportes detallados de:
- Cobertura de código
- Branches
- Métodos
- Líneas 


# 🚀 Guía de Despliegue con Docker - Challenge Mercado Libre

Esta guía te permite ejecutar todo el proyecto sin necesidad de instalar Node.js ni .NET. Solo necesitas tener Docker instalado para ver la aplicación en acción.

---

## ✅ 1. Imágenes Docker Disponibles

El proyecto ya cuenta con imágenes Docker publicadas y listas para usarse, alojadas en el siguiente repositorio:

🔗 **Repositorio Docker Hub:**  
[https://hub.docker.com/repository/docker/yeisonr01/challengeryeison/general]

| Servicio       | Imagen Docker                          |
|----------------|----------------------------------------|
| Frontend-Test  | `yeisonr0144/frontend-test`            |
| Frontend       | `yeisonr0144/frontend-v1`              |
| Backend        | `yeisonr0144/backend-v1`               |

Estas imágenes contienen la aplicación ya compilada, lista para entornos de producción.

---

📁 **Alternativa de descarga (en caso de inconvenientes con Docker Hub):**  
Se ha habilitado una carpeta compartida con las imágenes exportadas en formato `.tar` para ser importadas localmente:


🔗 [Descargar imágenes desde carpeta compartida](https://drive.google.com/drive/folders/1rhHBJyIKfo0klM6IAxVRW2aq_wZFKBtk?usp=drive_link) 


---

## 🛠️ 2. Requisitos

Antes de comenzar, asegúrate de tener:

- ✅ [Docker](https://www.docker.com/) instalado
- ✅ [Docker Compose](https://docs.docker.com/compose/) instalado
- ✅ El archivo `docker-compose.prod.yml` descargado

---


## 📦 3. Contenido de `docker-compose.prod.yml`

```yaml
version: "3.8"

services:
  frontend:
    image: yeisonr0144/frontend-v1
    ports:
      - "8080:80"
    depends_on:
      - backend
    networks:
      - app-network

  backend:
    image: yeisonr0144/backend-v1
    ports:
      - "5065:5065"
    networks:
      - app-network

  frontend-test:
    image: yeisonr0144/frontend-test
    command: npm run test -- --coverage
    volumes:
      - ./coverage:/app/coverage
    networks:
      - app-network

networks:
  app-network:
    driver: bridge
```

---

## ▶️ 4. Cómo Ejecutar el Proyecto

### Paso 1: Descargar el archivo

Guarda el archivo `docker-compose.prod.yml` en una carpeta vacía.

### Paso 2: Ejecutar los contenedores

Abre una terminal en esa carpeta y ejecuta:

```bash
docker-compose -f docker-compose.prod.yml up -d
```

### Paso 3: Acceder a la aplicación

- 🌐 **Frontend**: http://localhost:8080  
- 🛠️ **Backend (API)**: http://localhost:5065

---

## 🧠 5. ¿Por qué esta configuración?

### ✅ Simplicidad
- No necesitas instalar Node.js ni .NET
- Sin configuraciones adicionales ni dependencias

### 🌍 Portabilidad
- Corre igual en cualquier sistema operativo
- Solo necesitas Docker
- Ideal para presentaciones, demos o pruebas en otros equipos

---

## 🔌 6. Red y Comunicación

- Ambos servicios se comunican en la red interna `app-network`
- El frontend se comunica con el backend directamente sin exponer IPs
- Se exponen solo los puertos necesarios (`8080`, `5065`) al sistema host

---

## 🧪 7. Ejecutar Pruebas y Cobertura (opcional)

Si deseas ejecutar los tests desde dentro de los contenedores:

### 🔹 Frontend

```bash
docker exec -it <contenedor_frontend> npm run test -- --coverage
```

### 🔹 Backend

```bash
docker exec -it <contenedor_backend> dotnet test /p:CollectCoverage=true
```

> Puedes ver los IDs de los contenedores con `docker ps`.

---

## 🛠️ 8. Comandos útiles

| Acción                      | Comando                                                                 |
|-----------------------------|-------------------------------------------------------------------------|
| Ver logs                    | `docker-compose -f docker-compose.prod.yml logs`                        |
| Detener contenedores        | `docker-compose -f docker-compose.prod.yml down`                        |
| Reiniciar contenedores      | `docker-compose -f docker-compose.prod.yml restart`                     |
| Ver contenedores activos    | `docker ps`                                                             |
| Inspeccionar contenedor     | `docker exec -it <nombre> /bin/bash`                                    |

---

## 🧯 9. Solución de Problemas

### 🔁 Puertos ocupados
- Modifica los puertos `8080` o `5065` en `docker-compose.prod.yml`.

### 🛑 Imagen no encontrada en Docker Hub
- Asegúrate de que las imágenes `yeisonr0144/frontend-v1` y `yeisonr0144/backend-v1` existen en Docker Hub.
- Si no puedes descargar las imágenes desde Docker Hub, también estarán disponibles como archivos .tar en el repositorio de GitHub

#### 🔄 Pasos para cargar las imágenes manualmente:

1. Descarga los archivos:
   - `frontend-v1.tar`
   - `backend-v1.tar`

2. Carga las imágenes en Docker con los siguientes comandos:

```bash
# Cargar imagen del frontend
docker load -i frontend-v1.tar

# Cargar imagen del backend
docker load -i backend-v1.tar



### 🌐 Problemas de red
- Verifica tu conexión a internet
- Usa `docker network ls` y `docker network inspect app-network` para inspeccionar

---

## 📝 10. Notas Finales

- El **frontend** usa Nginx como servidor estático
- El **backend** corre en modo producción con CORS habilitado
- Las imágenes están configuradas para reiniciarse automáticamente en caso de fallo (`restart: unless-stopped` si se desea agregar)
