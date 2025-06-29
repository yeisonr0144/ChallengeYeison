using ChallengeYeison.Server.Controllers;
using ChallengeYeison.Server.Models;
using ChallengeYeison.Server.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Moq;
using System;
using Xunit;

namespace ChallengeYeison.Server.Tests
{
    public class ProductoControllerTests
    {
        private readonly Mock<ProductoService> _mockService;
        private readonly Mock<ILogger<ProductoController>> _mockLogger;
        private readonly ProductoController _controller;

        public ProductoControllerTests()
        {
            _mockService = new Mock<ProductoService>();
            _mockLogger = new Mock<ILogger<ProductoController>>();
            _controller = new ProductoController(_mockService.Object, _mockLogger.Object);
        }

        [Fact]
        public void GetById_ReturnsOkResult_WhenProductExists()
        {
            // Arrange
            var productId = "123";
            var mockProduct = new Producto
            {
                Id = productId,
                Title = "Producto Ejemplo",
                Price = 100
            };
            _mockService.Setup(s => s.GetById(productId)).Returns(mockProduct);

            // Act
            var result = _controller.GetById(productId);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var producto = Assert.IsType<Producto>(okResult.Value);
            Assert.NotNull(producto);
            Assert.Equal(mockProduct.Id, producto.Id);
            Assert.Equal(mockProduct.Title, producto.Title);
        }

        [Fact]
        public void GetById_ReturnsNotFound_WhenProductDoesNotExist()
        {
            // Arrange
            var productId = "123";
            _mockService.Setup(s => s.GetById(productId)).Returns((Producto)null);

            // Act
            var result = _controller.GetById(productId);

            // Assert
            var notFoundResult = Assert.IsType<NotFoundObjectResult>(result);
            Assert.NotNull(notFoundResult.Value);
            Assert.Contains("Producto con ID 123 no encontrado", notFoundResult.Value.ToString());
        }

        [Fact]
        public void GetById_ReturnsBadRequest_WhenArgumentExceptionIsThrown()
        {
            // Arrange
            var productId = "invalid-id";
            _mockService.Setup(s => s.GetById(productId)).Throws(new ArgumentException("ID inválido"));

            // Act
            var result = _controller.GetById(productId);

            // Assert
            var badRequestResult = Assert.IsType<BadRequestObjectResult>(result);
            Assert.NotNull(badRequestResult.Value);
            Assert.Contains("ID inválido", badRequestResult.Value.ToString());
        }

        [Fact]
        public void ClearCache_ReturnsOkResult_WhenCacheIsClearedSuccessfully()
        {
            // Arrange
            _mockService.Setup(s => s.ClearCache()).Verifiable();

            // Act
            var result = _controller.ClearCache();

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            Assert.NotNull(okResult.Value);
            Assert.Contains("Cache limpiado exitosamente", okResult.Value.ToString());
            _mockService.Verify(s => s.ClearCache(), Times.Once);
        }

        [Fact]
        public void ClearCache_ReturnsInternalServerError_WhenExceptionIsThrown()
        {
            // Arrange
            _mockService.Setup(s => s.ClearCache()).Throws(new Exception("Error inesperado"));

            // Act
            var result = _controller.ClearCache();

            // Assert
            var statusCodeResult = Assert.IsType<ObjectResult>(result);
            Assert.Equal(500, statusCodeResult.StatusCode);
            Assert.NotNull(statusCodeResult.Value);
            Assert.Contains("Error al limpiar el cache", statusCodeResult.Value.ToString());
        }
    }
}