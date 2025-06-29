using ChallengeYeison.Server.Controllers;
using ChallengeYeison.Server.Models;
using ChallengeYeison.Server.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Moq;
using Xunit;

namespace ChallengeYeison.Server.Tests.Integration
{
    public class ProductIntegrationTests
    {
        private readonly Mock<ProductoService> _mockProductService;
        private readonly Mock<ILogger<ProductoController>> _mockLogger;
        private readonly ProductoController _controller;

        public ProductIntegrationTests()
        {
            _mockProductService = new Mock<ProductoService>();
            _mockLogger = new Mock<ILogger<ProductoController>>();
            _controller = new ProductoController(_mockProductService.Object, _mockLogger.Object);
        }

        [Fact]
        public void GetProductById_ReturnsOk_WhenProductExists_Test()
        {
            // Arrange
            var productId = "123";
            var expectedProduct = new Producto
            {
                Id = productId,
                Title = "Test Product", // Usando la propiedad 'Title' de la clase Producto
                Price = 100.0M // Usando la propiedad 'Price' de la clase Producto
            };
            _mockProductService.Setup(s => s.GetById(productId)).Returns(expectedProduct); // Usando el método 'GetById' de ProductoService

            // Act
            var result = _controller.GetById(productId);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            Assert.Equal(expectedProduct, okResult.Value);
        }

        [Fact]
        public void GetProductById_ReturnsNotFound_WhenProductDoesNotExist_Test()
        {
            // Arrange
            var productId = "123";
            _mockProductService.Setup(s => s.GetById(productId)).Returns((Producto?)null); // Usando el método 'GetById' de ProductoService

            // Act
            var result = _controller.GetById(productId);

            // Assert
            var notFoundResult = Assert.IsType<NotFoundObjectResult>(result);
            Assert.Equal($"No se encontró el producto con ID: {productId}", notFoundResult.Value);
        }

        [Fact]
        public void GetProductById_ReturnsInternalServerError_WhenExceptionIsThrown_Test()
        {
            // Arrange
            var productId = "123";
            _mockProductService.Setup(s => s.GetById(productId)).Throws(new System.Exception("Database error")); // Usando el método 'GetById' de ProductoService

            // Act
            var result = _controller.GetById(productId);

            // Assert
            var statusCodeResult = Assert.IsType<ObjectResult>(result);
            Assert.Equal(500, statusCodeResult.StatusCode);
            Assert.Equal("Error interno del servidor al obtener el producto", statusCodeResult.Value);
        }
    }
}
