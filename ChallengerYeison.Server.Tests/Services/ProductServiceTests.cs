using ChallengeYeison.Server.Models;
using ChallengeYeison.Server.Services;
using Moq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text.Json;
using Xunit;

namespace ChallengerYeison.Server.Tests.Services
{
    public class ProductoServiceTests
    {
        private readonly string _testJsonPath = "TestData/Producto.json";

        [Fact]
        public void LoadProducts_ThrowsFileNotFoundException_WhenFileDoesNotExist()
        {
            // Arrange
            var productoService = new ProductoService();
            var invalidPath = "InvalidPath/Producto.json";
            var privateField = typeof(ProductoService).GetField("_jsonPath", System.Reflection.BindingFlags.NonPublic | System.Reflection.BindingFlags.Instance);
            privateField?.SetValue(productoService, invalidPath);

            // Act & Assert
            var exception = Assert.Throws<FileNotFoundException>(() => productoService.GetById("1"));
            Assert.Contains("El archivo de productos no existe", exception.Message);
        }

        [Fact]
        public void LoadProducts_ThrowsInvalidOperationException_WhenJsonIsInvalid()
        {
            // Arrange
            var productoService = new ProductoService();
            var privateField = typeof(ProductoService).GetField("_jsonPath", System.Reflection.BindingFlags.NonPublic | System.Reflection.BindingFlags.Instance);
            privateField?.SetValue(productoService, _testJsonPath);

            File.WriteAllText(_testJsonPath, "Invalid JSON");

            // Act & Assert
            var exception = Assert.Throws<InvalidOperationException>(() => productoService.GetById("1"));
            Assert.Contains("Error al deserializar el archivo de productos", exception.Message);

            // Cleanup
            File.Delete(_testJsonPath);
        }

        [Fact]
        public void GetById_ReturnsNull_WhenProductDoesNotExist()
        {
            // Arrange
            var productoService = new ProductoService();
            var privateField = typeof(ProductoService).GetField("_jsonPath", System.Reflection.BindingFlags.NonPublic | System.Reflection.BindingFlags.Instance);
            privateField?.SetValue(productoService, _testJsonPath);

            var products = new List<Producto>
            {
                new Producto { Id = "1", Title = "Producto 1" },
                new Producto { Id = "2", Title = "Producto 2" }
            };
            File.WriteAllText(_testJsonPath, JsonSerializer.Serialize(products));

            // Act
            var result = productoService.GetById("3");

            // Assert
            Assert.Null(result);

            // Cleanup
            File.Delete(_testJsonPath);
        }

        [Fact]
        public void GetById_ReturnsProduct_WhenProductExists()
        {
            // Arrange
            var productoService = new ProductoService();
            var privateField = typeof(ProductoService).GetField("_jsonPath", System.Reflection.BindingFlags.NonPublic | System.Reflection.BindingFlags.Instance);
            privateField?.SetValue(productoService, _testJsonPath);

            var products = new List<Producto>
            {
                new Producto { Id = "1", Title = "Producto 1" },
                new Producto { Id = "2", Title = "Producto 2" }
            };
            File.WriteAllText(_testJsonPath, JsonSerializer.Serialize(products));

            // Act
            var result = productoService.GetById("1");

            // Assert
            Assert.NotNull(result);
            Assert.Equal("1", result.Id);
            Assert.Equal("Producto 1", result.Title);

            // Cleanup
            File.Delete(_testJsonPath);
        }

        [Fact]
        public void ClearCache_ResetsCachedProducts()
        {
            // Arrange
            var productoService = new ProductoService();
            var privateField = typeof(ProductoService).GetField("_jsonPath", System.Reflection.BindingFlags.NonPublic | System.Reflection.BindingFlags.Instance);
            privateField?.SetValue(productoService, _testJsonPath);

            var products = new List<Producto>
            {
                new Producto { Id = "1", Title = "Producto 1" }
            };
            File.WriteAllText(_testJsonPath, JsonSerializer.Serialize(products));

            // Act
            var productBeforeClear = productoService.GetById("1");
            productoService.ClearCache();
            var productAfterClear = productoService.GetById("1");

            // Assert
            Assert.NotNull(productBeforeClear);
            Assert.NotNull(productAfterClear);
            Assert.Equal("Producto 1", productBeforeClear.Title);
            Assert.Equal("Producto 1", productAfterClear.Title);

            // Cleanup
            File.Delete(_testJsonPath);
        }
    }
}
