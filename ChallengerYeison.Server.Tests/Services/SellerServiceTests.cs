using ChallengeYeison.Server.Models;
using ChallengeYeison.Server.Services;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Logging;
using Moq;
using System;
using System.Collections.Generic;
using System.Text.Json;
using Xunit;

namespace ChallengerYeison.Server.Tests.Services
{
    public class SellerServiceTests
    {
        private readonly Mock<IWebHostEnvironment> _mockWebHostEnvironment;
        private readonly Mock<ILogger<SellerService>> _mockLogger;
        private readonly SellerService _sellerService;

        public SellerServiceTests()
        {
            _mockWebHostEnvironment = new Mock<IWebHostEnvironment>();
            _mockLogger = new Mock<ILogger<SellerService>>();
            _mockWebHostEnvironment.Setup(env => env.ContentRootPath).Returns(string.Empty);
            _sellerService = new SellerService(_mockWebHostEnvironment.Object, _mockLogger.Object);
        }

        [Fact]
        public void LoadSellers_ReturnsEmptyList_WhenJsonIsInvalid()
        {
            // Arrange
            var privateField = typeof(SellerService).GetField("_jsonData", System.Reflection.BindingFlags.NonPublic | System.Reflection.BindingFlags.Instance);
            privateField?.SetValue(_sellerService, "Invalid JSON");

            // Act
            var sellers = _sellerService.GetSellerById("1");

            // Assert
            Assert.Null(sellers);
        }

        [Fact]
        public void GetSellerById_ReturnsNull_WhenSellerDoesNotExist()
        {
            // Arrange
            var jsonData = @"[
                {""Id"": ""1"", ""Name"": ""Seller 1""},
                {""Id"": ""2"", ""Name"": ""Seller 2""}
            ]";
            var privateField = typeof(SellerService).GetField("_jsonData", System.Reflection.BindingFlags.NonPublic | System.Reflection.BindingFlags.Instance);
            privateField?.SetValue(_sellerService, jsonData);

            // Act
            var result = _sellerService.GetSellerById("3");

            // Assert
            Assert.Null(result);
        }

        [Fact]
        public void GetSellerById_ReturnsSeller_WhenSellerExists()
        {
            // Arrange
            var jsonData = @"[
                {""Id"": ""1"", ""Name"": ""Seller 1""},
                {""Id"": ""2"", ""Name"": ""Seller 2""}
            ]";
            var privateField = typeof(SellerService).GetField("_jsonData", System.Reflection.BindingFlags.NonPublic | System.Reflection.BindingFlags.Instance);
            privateField?.SetValue(_sellerService, jsonData);

            // Act
            var result = _sellerService.GetSellerById("1");

            // Assert
            Assert.NotNull(result);
            Assert.Equal("1", result.Id);
            Assert.Equal("Seller 1", result.Name);
        }

        [Fact]
        public void GetSellerById_ThrowsArgumentException_WhenIdIsEmpty()
        {
            // Act & Assert
            var exception = Assert.Throws<ArgumentException>(() => _sellerService.GetSellerById(string.Empty));
            Assert.Contains("El ID del vendedor no puede estar vacío", exception.Message);
        }
    }
}
