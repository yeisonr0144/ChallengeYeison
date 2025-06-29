using ChallengeYeison.Server.Controllers;
using ChallengeYeison.Server.Models;
using ChallengeYeison.Server.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Moq;
using Xunit;

namespace ChallengeYeison.Server.Tests
{
    public class ReviewControllerTests
    {
        private readonly Mock<ReviewService> _mockReviewService; // Cambiado a IReviewService para evitar ambigüedad
        private readonly Mock<ILogger<ReviewController>> _mockLogger;
        private readonly ReviewController _controller;

        public ReviewControllerTests()
        {
            _mockReviewService = new Mock<ReviewService>(); // Cambiado a IReviewService
            _mockLogger = new Mock<ILogger<ReviewController>>();
            _controller = new ReviewController(_mockReviewService.Object, _mockLogger.Object);
        }

        [Fact]
        public void GetByProductId_ReturnsOk_WhenReviewExists_Test()
        {
            // Arrange
            var productId = "123";
            var expectedReview = new ProductReview
            {
                ProductId = productId,
                Rating = new ProductRating
                {
                    Average = 4.5,
                    TotalReviews = 10
                },
            };
            _mockReviewService.Setup(s => s.GetByProductId(productId)).Returns(expectedReview);

            // Act
            var result = _controller.GetByProductId(productId);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            Assert.Equal(expectedReview, okResult.Value);
        }

        [Fact]
        public void GetByProductId_ReturnsNotFound_WhenReviewDoesNotExist_Test()
        {
            // Arrange
            var productId = "123";
            _mockReviewService.Setup(s => s.GetByProductId(productId)).Returns((ProductReview)null);

            // Act
            var result = _controller.GetByProductId(productId);

            // Assert
            var notFoundResult = Assert.IsType<NotFoundObjectResult>(result.Result);
            Assert.Equal($"No se encontraron reviews para el producto con ID: {productId}", notFoundResult.Value);
        }

        [Fact]
        public void GetByProductId_ReturnsInternalServerError_WhenExceptionIsThrown_Test()
        {
            // Arrange
            var productId = "123";
            _mockReviewService.Setup(s => s.GetByProductId(productId)).Throws(new System.Exception("Database error"));

            // Act
            var result = _controller.GetByProductId(productId);

            // Assert
            var statusCodeResult = Assert.IsType<ObjectResult>(result.Result);
            Assert.Equal(500, statusCodeResult.StatusCode);
            Assert.Equal("Error interno del servidor al obtener las reviews", statusCodeResult.Value);
        }
    }
}
