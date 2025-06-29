using ChallengeYeison.Server.Models;
using System.Text.Json;

namespace ChallengeYeison.Server.Services
{
    public class ReviewService
    {
        private readonly string _jsonPath = "Data/Review.json";
        private List<ProductReview>? _cachedReviews;
        private DateTime _lastCacheUpdate = DateTime.MinValue;
        private readonly TimeSpan _cacheExpiration = TimeSpan.FromMinutes(5);

        private List<ProductReview> LoadReviews()
        {
            if (_cachedReviews != null && DateTime.Now - _lastCacheUpdate < _cacheExpiration)
            {
                return _cachedReviews;
            }

            try
            {
                if (!File.Exists(_jsonPath))
                {
                    throw new FileNotFoundException($"El archivo de reviews no existe en la ruta: {_jsonPath}");
                }

                var json = File.ReadAllText(_jsonPath);
                _cachedReviews = JsonSerializer.Deserialize<List<ProductReview>>(json, new JsonSerializerOptions 
                { 
                    PropertyNameCaseInsensitive = true,
                    PropertyNamingPolicy = JsonNamingPolicy.CamelCase
                }) ?? new List<ProductReview>();

                _lastCacheUpdate = DateTime.Now;
                return _cachedReviews;
            }
            catch (JsonException ex)
            {
                throw new InvalidOperationException("Error al deserializar el archivo de reviews", ex);
            }
            catch (Exception ex)
            {
                throw new InvalidOperationException($"Error al leer el archivo de reviews: {ex.Message}", ex);
            }
        }

        public virtual ProductReview? GetByProductId(string productId)
        {
            if (string.IsNullOrWhiteSpace(productId))
            {
                throw new ArgumentException("El ID del producto no puede estar vacío", nameof(productId));
            }

            try
            {
                return LoadReviews().FirstOrDefault(r => r.ProductId?.Equals(productId, StringComparison.OrdinalIgnoreCase) ?? false);
            }
            catch (Exception ex)
            {
                throw new InvalidOperationException($"Error al obtener las reviews del producto con ID {productId}", ex);
            }
        }

        public virtual void ClearCache()
        {
            _cachedReviews = null;
            _lastCacheUpdate = DateTime.MinValue;
        }
    }
} 