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
    public class ProductoServiceTests
    {
        private readonly ITestOutputHelper _output;

        public ProductoServiceTests(ITestOutputHelper output)
        {
            _output = output;
        }

        [Fact]
        public void LoadProducts_ThrowsInvalidOperationException_WhenJsonIsInvalid()
        {
            // Arrange
            var productoService = new ProductoService();
            var privateField = typeof(ProductoService).GetField("_jsonPath", System.Reflection.BindingFlags.NonPublic | System.Reflection.BindingFlags.Instance);
            _output.WriteLine($"Campo privado encontrado: {privateField != null}");
            privateField?.SetValue(productoService, "Invalid/Path/To/File.json");

            // Act & Assert
            var exception = Assert.Throws<FileNotFoundException>(() => productoService.LoadProducts());
            Assert.Contains("El archivo de productos no existe", exception.Message);
        }

        [Fact]
        public void GetById_ReturnsNull_WhenProductDoesNotExist()
        {
            // Arrange
            var productoService = new ProductoService();
            var products = new List<Producto>
            {
                new() { Id = "1", Title = "Producto 1", Price = 100, Stock = 10 },
                new() { Id = "2", Title = "Producto 2", Price = 200, Stock = 20 }
            };
            var privateField = typeof(ProductoService).GetField("_cachedProducts", System.Reflection.BindingFlags.NonPublic | System.Reflection.BindingFlags.Instance);
            _output.WriteLine($"Campo privado encontrado: {privateField != null}");
            _output.WriteLine($"Productos: {JsonSerializer.Serialize(products)}");
            privateField?.SetValue(productoService, products);

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
            var products = new List<Producto>
            {
                new() { Id = "1", Title = "Producto 1", Price = 100, Stock = 10 },
                new() { Id = "2", Title = "Producto 2", Price = 200, Stock = 20 }
            };
            var privateField = typeof(ProductoService).GetField("_cachedProducts", System.Reflection.BindingFlags.NonPublic | System.Reflection.BindingFlags.Instance);
            _output.WriteLine($"Campo privado encontrado: {privateField != null}");
            _output.WriteLine($"Productos: {JsonSerializer.Serialize(products)}");
            privateField?.SetValue(productoService, products);

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
            var products = new List<Producto>
            {
                new() { Id = "1", Title = "Producto 1", Price = 100, Stock = 10 }
            };
            var privateField = typeof(ProductoService).GetField("_cachedProducts", System.Reflection.BindingFlags.NonPublic | System.Reflection.BindingFlags.Instance);
            _output.WriteLine($"Campo privado encontrado: {privateField != null}");
            _output.WriteLine($"Productos: {JsonSerializer.Serialize(products)}");
            privateField?.SetValue(productoService, products);

            // Act
            productoService.ClearCache();

            // Assert
            var cachedProducts = privateField?.GetValue(productoService) as List<Producto>;
            Assert.Null(cachedProducts);
        }
    }
}
