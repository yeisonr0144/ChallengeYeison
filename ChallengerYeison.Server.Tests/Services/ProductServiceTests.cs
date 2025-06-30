using ChallengeYeison.Server.Models;
using ChallengeYeison.Server.Services;
using System;
using System.Collections.Generic;
using System.Text.Json;
using Xunit;

namespace ChallengerYeison.Server.Tests.Services
{
    public class ProductoServiceTests
    {
        [Fact]
        public void LoadProducts_ThrowsInvalidOperationException_WhenJsonIsInvalid()
        {
            // Arrange
            var productoService = new ProductoService();
            var privateField = typeof(ProductoService).GetField("_jsonData", System.Reflection.BindingFlags.NonPublic | System.Reflection.BindingFlags.Instance);
            privateField?.SetValue(productoService, "Invalid JSON");

            // Act & Assert
            var exception = Assert.Throws<JsonException>(() => productoService.LoadProducts());
            Assert.Contains("Error al deserializar el archivo de productos", exception.Message);
        }

        [Fact]
        public void GetById_ReturnsNull_WhenProductDoesNotExist()
        {
            // Arrange
            var productoService = new ProductoService();
            var jsonData = @"[
                {""Id"": ""1"", ""Title"": ""Producto 1"", ""Price"": 100, ""Stock"": 10},
                {""Id"": ""2"", ""Title"": ""Producto 2"", ""Price"": 200, ""Stock"": 20}
            ]";
            var privateField = typeof(ProductoService).GetField("_jsonData", System.Reflection.BindingFlags.NonPublic | System.Reflection.BindingFlags.Instance);
            privateField?.SetValue(productoService, jsonData);

            // Act
            var result = productoService.GetById("3");

            // Assert
            Assert.Null(result);
        }

        [Fact]
        public void GetById_ReturnsProduct_WhenProductExists()
        {
            // Arrange
            var productoService = new ProductoService();
            var jsonData = @"[
                {""Id"": ""1"", ""Title"": ""Producto 1"", ""Price"": 100, ""Stock"": 10},
                {""Id"": ""2"", ""Title"": ""Producto 2"", ""Price"": 200, ""Stock"": 20}
            ]";
            var privateField = typeof(ProductoService).GetField("_jsonData", System.Reflection.BindingFlags.NonPublic | System.Reflection.BindingFlags.Instance);
            privateField?.SetValue(productoService, jsonData);

            // Act
            var result = productoService.GetById("1");

            // Assert
            Assert.NotNull(result);
            Assert.Equal("1", result.Id);
            Assert.Equal("Producto 1", result.Title);
            Assert.Equal(100, result.Price);
            Assert.Equal(10, result.Stock);
        }

        [Fact]
        public void ClearCache_ResetsCachedProducts()
        {
            // Arrange
            var productoService = new ProductoService();
            var jsonData = @"[
                {""Id"": ""1"", ""Title"": ""Producto 1"", ""Price"": 100, ""Stock"": 10}
            ]";
            var privateField = typeof(ProductoService).GetField("_jsonData", System.Reflection.BindingFlags.NonPublic | System.Reflection.BindingFlags.Instance);
            privateField?.SetValue(productoService, jsonData);

            // Act
            var productBeforeClear = productoService.GetById("1");
            productoService.ClearCache();
            var productAfterClear = productoService.GetById("1");

            // Assert
            Assert.NotNull(productBeforeClear);
            Assert.NotNull(productAfterClear);
            Assert.Equal("Producto 1", productBeforeClear.Title);
            Assert.Equal("Producto 1", productAfterClear.Title);
        }
    }
}
