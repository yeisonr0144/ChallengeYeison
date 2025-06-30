using ChallengeYeison.Server.Controllers;
using ChallengeYeison.Server.Models;
using ChallengeYeison.Server.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Moq;
using System;
using Xunit;

namespace ChallengerYeison.Server.Tests
{
    public class SellerControllerTests
    {
        private readonly Mock<ISellerService> _mockSellerService; // Cambiar a la interfaz
        private readonly Mock<ILogger<SellerController>> _mockLogger;
        private readonly SellerController _controller;

        public SellerControllerTests()
        {
            _mockSellerService = new Mock<ISellerService>(); // Crear el mock de la interfaz
            _mockLogger = new Mock<ILogger<SellerController>>();
            _controller = new SellerController(_mockSellerService.Object, _mockLogger.Object);
        }

        [Fact]
        public void GetById_ReturnsOk_WhenSellerExists()
        {
            // Arrange
            var sellerId = "123";
            var expectedSeller = new SellerDetail { Id = sellerId, Name = "Test Seller" };
            _mockSellerService.Setup(s => s.GetSellerById(sellerId)).Returns(expectedSeller);

            // Act
            var result = _controller.GetById(sellerId);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            Assert.NotNull(okResult.Value);
            Assert.Equal(expectedSeller, okResult.Value);
        }

        [Fact]
        public void GetById_ReturnsNotFound_WhenSellerDoesNotExist()
        {
            // Arrange
            var sellerId = "123";
            _mockSellerService.Setup(s => s.GetSellerById(sellerId)).Returns((SellerDetail?)null);

            // Act
            var result = _controller.GetById(sellerId);

            // Assert
            var notFoundResult = Assert.IsType<NotFoundObjectResult>(result);
            Assert.NotNull(notFoundResult.Value);

            // Validar la respuesta de error
            var response = Assert.IsType<ErrorResponse>(notFoundResult.Value);
            Assert.Equal($"Vendedor con ID {sellerId} no encontrado", response.Message);
        }

        [Fact]
        public void GetById_ReturnsBadRequest_WhenArgumentExceptionIsThrown()
        {
            // Arrange
            var sellerId = "123";
            _mockSellerService.Setup(s => s.GetSellerById(sellerId)).Throws(new ArgumentException("ID inválido"));

            // Act
            var result = _controller.GetById(sellerId);

            // Assert
            var badRequestResult = Assert.IsType<BadRequestObjectResult>(result);
            Assert.NotNull(badRequestResult.Value);

            // Validar la respuesta de error
            var response = Assert.IsType<ErrorResponse>(badRequestResult.Value);
            Assert.Equal("ID inválido", response.Message);
        }

        [Fact]
        public void GetById_ReturnsInternalServerError_WhenExceptionIsThrown()
        {
            // Arrange
            var sellerId = "123";
            _mockSellerService.Setup(s => s.GetSellerById(sellerId)).Throws(new Exception("Error interno"));

            // Act
            var result = _controller.GetById(sellerId);

            // Assert
            var statusCodeResult = Assert.IsType<ObjectResult>(result);
            Assert.NotNull(statusCodeResult.Value);
            Assert.Equal(500, statusCodeResult.StatusCode);

            // Validar la respuesta de error
            var response = Assert.IsType<ErrorResponse>(statusCodeResult.Value);
            Assert.Equal("Error interno del servidor al obtener el vendedor", response.Message);
        }
    }
}