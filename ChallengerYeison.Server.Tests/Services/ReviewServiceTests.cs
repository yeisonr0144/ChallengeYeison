using ChallengeYeison.Server.Models;
using ChallengeYeison.Server.Services;
using System;
using System.Collections.Generic;
using System.Text.Json;
using Xunit;

namespace ChallengerYeison.Server.Tests.Services
{
    public class ReviewServiceTests
    {
        [Fact]
        public void LoadReviews_ThrowsInvalidOperationException_WhenJsonIsInvalid()
        {
            // Arrange
            var reviewService = new ReviewService();
            var privateField = typeof(ReviewService).GetField("_jsonData", System.Reflection.BindingFlags.NonPublic | System.Reflection.BindingFlags.Instance);
            privateField?.SetValue(reviewService, "Invalid JSON");

            // Act & Assert
            var exception = Assert.Throws<InvalidOperationException>(() => reviewService.GetByProductId("1"));
            Assert.Contains("Error al deserializar el archivo de reviews", exception.Message);
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
            var jsonData = @"[
                {""ProductId"": ""1""},
                {""ProductId"": ""2""}
            ]";
            var privateField = typeof(ReviewService).GetField("_jsonData", System.Reflection.BindingFlags.NonPublic | System.Reflection.BindingFlags.Instance);
            privateField?.SetValue(reviewService, jsonData);

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
            var jsonData = @"[
                {""ProductId"": ""1"", ""Rating"": {""Average"": 4.5}},
                {""ProductId"": ""2"", ""Rating"": {""Average"": 3.0}}
            ]";
            var privateField = typeof(ReviewService).GetField("_jsonData", System.Reflection.BindingFlags.NonPublic | System.Reflection.BindingFlags.Instance);
            privateField?.SetValue(reviewService, jsonData);

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
            var jsonData = @"[{""ProductId"": ""1""}]";
            var privateField = typeof(ReviewService).GetField("_jsonData", System.Reflection.BindingFlags.NonPublic | System.Reflection.BindingFlags.Instance);
            privateField?.SetValue(reviewService, jsonData);

            // Act
            var reviewBeforeClear = reviewService.GetByProductId("1");
            reviewService.ClearCache();
            var reviewAfterClear = reviewService.GetByProductId("1");

            // Assert
            Assert.NotNull(reviewBeforeClear);
            Assert.NotNull(reviewAfterClear);
            Assert.Equal("1", reviewBeforeClear.ProductId);
            Assert.Equal("1", reviewAfterClear.ProductId);
        }
    }
}
