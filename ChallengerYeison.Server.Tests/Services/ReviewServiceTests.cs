using ChallengeYeison.Server.Models;
using ChallengeYeison.Server.Services;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text.Json;
using Xunit;

namespace ChallengerYeison.Server.Tests.Services
{
    public class ReviewServiceTests
    {
        private readonly string _testJsonPath = "TestData/Review.json";

        [Fact]
        public void LoadReviews_ThrowsFileNotFoundException_WhenFileDoesNotExist()
        {
            // Arrange
            var reviewService = new ReviewService();
            var privateField = typeof(ReviewService).GetField("_jsonPath", System.Reflection.BindingFlags.NonPublic | System.Reflection.BindingFlags.Instance);
            privateField?.SetValue(reviewService, "InvalidPath/Review.json");

            // Act & Assert
            var exception = Assert.Throws<FileNotFoundException>(() => reviewService.GetByProductId("1"));
            Assert.Contains("El archivo de reviews no existe", exception.Message);
        }

        [Fact]
        public void LoadReviews_ThrowsInvalidOperationException_WhenJsonIsInvalid()
        {
            // Arrange
            var reviewService = new ReviewService();
            var privateField = typeof(ReviewService).GetField("_jsonPath", System.Reflection.BindingFlags.NonPublic | System.Reflection.BindingFlags.Instance);
            privateField?.SetValue(reviewService, _testJsonPath);

            File.WriteAllText(_testJsonPath, "Invalid JSON");

            // Act & Assert
            var exception = Assert.Throws<InvalidOperationException>(() => reviewService.GetByProductId("1"));
            Assert.Contains("Error al deserializar el archivo de reviews", exception.Message);

            // Cleanup
            File.Delete(_testJsonPath);
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
            var privateField = typeof(ReviewService).GetField("_jsonPath", System.Reflection.BindingFlags.NonPublic | System.Reflection.BindingFlags.Instance);
            privateField?.SetValue(reviewService, _testJsonPath);

            var reviews = new List<ProductReview>
            {
                new ProductReview { ProductId = "1" },
                new ProductReview { ProductId = "2" }
            };
            File.WriteAllText(_testJsonPath, JsonSerializer.Serialize(reviews));

            // Act
            var result = reviewService.GetByProductId("3");

            // Assert
            Assert.Null(result);

            // Cleanup
            File.Delete(_testJsonPath);
        }

        [Fact]
        public void GetByProductId_ReturnsReview_WhenReviewExists()
        {
            // Arrange
            var reviewService = new ReviewService();
            var privateField = typeof(ReviewService).GetField("_jsonPath", System.Reflection.BindingFlags.NonPublic | System.Reflection.BindingFlags.Instance);
            privateField?.SetValue(reviewService, _testJsonPath);

            var reviews = new List<ProductReview>
            {
                new ProductReview { ProductId = "1", Rating = new ProductRating { Average = 4.5 } },
                new ProductReview { ProductId = "2", Rating = new ProductRating { Average = 3.0 } }
            };
            File.WriteAllText(_testJsonPath, JsonSerializer.Serialize(reviews));

            // Act
            var result = reviewService.GetByProductId("1");

            // Assert
            Assert.NotNull(result);
            Assert.Equal("1", result.ProductId);
            Assert.Equal(4.5, result.Rating?.Average);

            // Cleanup
            File.Delete(_testJsonPath);
        }

        [Fact]
        public void ClearCache_ResetsCachedReviews()
        {
            // Arrange
            var reviewService = new ReviewService();
            var privateField = typeof(ReviewService).GetField("_jsonPath", System.Reflection.BindingFlags.NonPublic | System.Reflection.BindingFlags.Instance);
            privateField?.SetValue(reviewService, _testJsonPath);

            var reviews = new List<ProductReview>
            {
                new ProductReview { ProductId = "1" }
            };
            File.WriteAllText(_testJsonPath, JsonSerializer.Serialize(reviews));

            // Act
            var reviewBeforeClear = reviewService.GetByProductId("1");
            reviewService.ClearCache();
            var reviewAfterClear = reviewService.GetByProductId("1");

            // Assert
            Assert.NotNull(reviewBeforeClear);
            Assert.NotNull(reviewAfterClear);
            Assert.Equal("1", reviewBeforeClear.ProductId);
            Assert.Equal("1", reviewAfterClear.ProductId);

            // Cleanup
            File.Delete(_testJsonPath);
        }
    }
}
