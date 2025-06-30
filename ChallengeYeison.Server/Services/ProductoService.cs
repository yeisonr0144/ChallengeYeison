using ChallengeYeison.Server.Models;
using System.Text.Json;

namespace ChallengeYeison.Server.Services
{
    public class ProductoService
    {
        private readonly string _jsonPath = "Data/Producto.json";
        private List<Producto>? _cachedProducts;
        private DateTime _lastCacheUpdate = DateTime.MinValue;
        private readonly TimeSpan _cacheExpiration = TimeSpan.FromMinutes(5);

        private List<Producto> LoadProducts()
        {
            // Validar si el caché es válido (debe cumplir ambas condiciones)
            if (_cachedProducts != null && DateTime.Now - _lastCacheUpdate < _cacheExpiration)
            {
                return _cachedProducts;
            }

            try
            {
                // Verificar si el archivo existe
                if (!File.Exists(_jsonPath))
                {
                    throw new FileNotFoundException($"El archivo de productos no existe en la ruta: {_jsonPath}");
                }

                // Leer y deserializar el archivo JSON
                var json = File.ReadAllText(_jsonPath);
                var deserializedProducts = JsonSerializer.Deserialize<List<Producto>>(json, new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true // Permitir coincidencia de nombres de propiedades sin importar mayúsculas/minúsculas
                });

                // Validar que los datos deserializados no sean nulos
                if (deserializedProducts == null)
                {
                    throw new InvalidOperationException("El archivo de productos está vacío o tiene un formato incorrecto.");
                }

                // Actualizar el caché
                _cachedProducts = deserializedProducts;
                _lastCacheUpdate = DateTime.Now;

                return _cachedProducts;
            }
            catch (JsonException ex)
            {
                throw new InvalidOperationException("Error al deserializar el archivo de productos", ex);
            }
            catch (Exception ex)
            {
                throw new InvalidOperationException($"Error al leer el archivo de productos: {ex.Message}", ex);
            }
        }


        public virtual Producto? GetById(string id)
        {
            if (string.IsNullOrWhiteSpace(id))
            {
                throw new ArgumentException("El ID del producto no puede estar vacío", nameof(id));
            }

            try
            {
                LoadProducts();
                return _cachedProducts?.FirstOrDefault(p => p.Id == id);
            }
            catch (FileNotFoundException ex)
            {
                throw new InvalidOperationException("Error al leer el archivo de productos", ex);
            }
            catch (Exception ex)
            {
                throw new InvalidOperationException($"Error al obtener el producto con ID {id}", ex);
            }
        }


        public virtual void ClearCache()
        {
            _cachedProducts = null;
            _lastCacheUpdate = DateTime.MinValue;
        }
    }
}
