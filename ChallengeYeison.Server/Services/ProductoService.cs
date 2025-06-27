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

        public List<Producto> GetAll()
        {
            if (_cachedProducts != null && DateTime.Now - _lastCacheUpdate < _cacheExpiration)
            {
                return _cachedProducts;
            }

            try
            {
                if (!File.Exists(_jsonPath))
                {
                    throw new FileNotFoundException($"El archivo de productos no existe en la ruta: {_jsonPath}");
                }

                var json = File.ReadAllText(_jsonPath);
                _cachedProducts = JsonSerializer.Deserialize<List<Producto>>(json, new JsonSerializerOptions 
                { 
                    PropertyNameCaseInsensitive = true,
                    PropertyNamingPolicy = JsonNamingPolicy.CamelCase
                }) ?? new List<Producto>();

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

        public Producto? GetById(string id)
        {
            if (string.IsNullOrWhiteSpace(id))
            {
                throw new ArgumentException("El ID del producto no puede estar vacío", nameof(id));
            }

            try
            {
                return GetAll().FirstOrDefault(p => p.Id.Equals(id, StringComparison.OrdinalIgnoreCase));
            }
            catch (Exception ex)
            {
                throw new InvalidOperationException($"Error al obtener el producto con ID {id}", ex);
            }
        }

        public void ClearCache()
        {
            _cachedProducts = null;
            _lastCacheUpdate = DateTime.MinValue;
        }
    }
}
