using ChallengeYeison.Server.Models;
using ChallengeYeison.Server.Services;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text.Json;
using Xunit;
using Xunit.Abstractions;

namespace ChallengerYeison.Server.Tests.Services
{
    public class ReviewServiceTests
    {
        private readonly ITestOutputHelper _output;

        public ReviewServiceTests(ITestOutputHelper output)
        {
            _output = output;
        }

        [Fact]
        public void LoadReviews_ThrowsInvalidOperationException_WhenJsonIsInvalid()
        {
            // Arrange
            var reviewService = new ReviewService();
            var privateField = typeof(ReviewService).GetField("_jsonPath", System.Reflection.BindingFlags.NonPublic | System.Reflection.BindingFlags.Instance);
            _output.WriteLine($"Campo privado encontrado: {privateField != null}");
            privateField?.SetValue(reviewService, "Invalid/Path/To/File.json");

            // Act & Assert
            var exception = Assert.Throws<InvalidOperationException>(() => reviewService.GetByProductId("1"));
            Assert.Contains("Error al leer el archivo de reviews", exception.Message);
            Assert.IsType<FileNotFoundException>(exception.InnerException);
            Assert.Contains("El archivo de reviews no existe", exception.InnerException?.Message);
        }

        [Fact]
        public void GetByProductId_ThrowsArgumentException_WhenProductIdIsEmpty()
        {
            // Arrange
            var reviewService = new ReviewService();

            // Act & Assert
            var exception = Assert.Throws<ArgumentException>(() => reviewService.GetByProductId(string.Empty));
            Assert.Contains("El ID del producto no puede estar vacío", exception.Message);
        }

        [Fact]
        public void GetByProductId_ReturnsNull_WhenReviewDoesNotExist()
        {
            // Arrange
            var reviewService = new ReviewService();
            var reviews = new List<ProductReview>
            {
                new() { ProductId = "1" },
                new() { ProductId = "2" }
            };
            var privateField = typeof(ReviewService).GetField("_cachedReviews", System.Reflection.BindingFlags.NonPublic | System.Reflection.BindingFlags.Instance);
            _output.WriteLine($"Campo privado encontrado: {privateField != null}");
            _output.WriteLine($"Reviews: {JsonSerializer.Serialize(reviews)}");
            privateField?.SetValue(reviewService, reviews);

            // Act
            var result = reviewService.GetByProductId("3");

            // Assert
            Assert.Null(result);
        }

        [Fact]
        public void GetByProductId_ReturnsReview_WhenReviewExists()
        {
            // Arrange
            var reviewService = new ReviewService();
            var reviews = new List<ProductReview>
            {
                new() { ProductId = "1", Rating = new ProductRating { Average = 4.5 } },
                new() { ProductId = "2", Rating = new ProductRating { Average = 3.0 } }
            };
            var privateField = typeof(ReviewService).GetField("_cachedReviews", System.Reflection.BindingFlags.NonPublic | System.Reflection.BindingFlags.Instance);
            var lastUpdateField = typeof(ReviewService).GetField("_lastCacheUpdate", System.Reflection.BindingFlags.NonPublic | System.Reflection.BindingFlags.Instance);
            _output.WriteLine($"Campo privado encontrado: {privateField != null}");
            _output.WriteLine($"Reviews: {JsonSerializer.Serialize(reviews)}");
            privateField?.SetValue(reviewService, reviews);
            lastUpdateField?.SetValue(reviewService, DateTime.Now);

            // Act
            var result = reviewService.GetByProductId("1");

            // Assert
            Assert.NotNull(result);
            Assert.Equal("1", result.ProductId);
            Assert.Equal(4.5, result.Rating?.Average);
        }

        [Fact]
        public void ClearCache_ResetsCachedReviews()
        {
            // Arrange
            var reviewService = new ReviewService();
            var reviews = new List<ProductReview>
            {
                new() { ProductId = "1" }
            };
            var privateField = typeof(ReviewService).GetField("_cachedReviews", System.Reflection.BindingFlags.NonPublic | System.Reflection.BindingFlags.Instance);
            _output.WriteLine($"Campo privado encontrado: {privateField != null}");
            _output.WriteLine($"Reviews: {JsonSerializer.Serialize(reviews)}");
            privateField?.SetValue(reviewService, reviews);

            // Act
            reviewService.ClearCache();

            // Assert
            var cachedReviews = privateField?.GetValue(reviewService) as List<ProductReview>;
            Assert.Null(cachedReviews);
        }
    }
}
