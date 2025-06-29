using ChallengeYeison.Server.Controllers;
using ChallengeYeison.Server.Models;
using ChallengeYeison.Server.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Moq;
using System;

namespace ChallengerYeison.Server.Tests
{
    public class ReviewControllerTests
    {
        private readonly Mock<ReviewService> _mockReviewService;
        private readonly Mock<ILogger<ReviewController>> _mockLogger;
        private readonly ReviewController _controller;

        public ReviewControllerTests()
        {
            _mockReviewService = new Mock<ReviewService>();
            _mockLogger = new Mock<ILogger<ReviewController>>();
            _controller = new ReviewController(_mockReviewService.Object, _mockLogger.Object);
        }

        [Fact]
        public void GetByProductId_ReturnsOk_WhenReviewExists()
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
        public void GetByProductId_ReturnsNotFound_WhenReviewDoesNotExist()
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
        public void GetByProductId_ReturnsInternalServerError_WhenExceptionIsThrown()
        {
            // Arrange
            var productId = "123";
            _mockReviewService.Setup(s => s.GetByProductId(productId)).Throws(new Exception("Database error"));

            // Act
            var result = _controller.GetByProductId(productId);

            // Assert
            var statusCodeResult = Assert.IsType<ObjectResult>(result.Result);
            Assert.Equal(500, statusCodeResult.StatusCode);
            Assert.Equal("Error interno del servidor al obtener las reviews", statusCodeResult.Value);
        }
    }
}