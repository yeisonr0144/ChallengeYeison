using ChallengeYeison.Server.Models;
using ChallengeYeison.Server.Services;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Logging;
using Moq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text.Json;
using Xunit;

namespace ChallengeYeison.Server.Tests.Services
{
    public class SellerServiceTests
    {
        private readonly Mock<IWebHostEnvironment> _mockWebHostEnvironment;
        private readonly Mock<ILogger<SellerService>> _mockLogger;
        private readonly SellerService _sellerService;
        private readonly string _testJsonPath = "TestData/Seller.json";

        public SellerServiceTests()
        {
            _mockWebHostEnvironment = new Mock<IWebHostEnvironment>();
            _mockLogger = new Mock<ILogger<SellerService>>();
            _mockWebHostEnvironment.Setup(env => env.ContentRootPath).Returns(Directory.GetCurrentDirectory());
            _sellerService = new SellerService(_mockWebHostEnvironment.Object, _mockLogger.Object);
        }

        [Fact]
        public void LoadSellers_ReturnsEmptyList_WhenFileDoesNotExist()
        {
            // Arrange
            var invalidPath = "InvalidPath/Seller.json";
            var privateField = typeof(SellerService).GetField("_dataPath", System.Reflection.BindingFlags.NonPublic | System.Reflection.BindingFlags.Instance);
            privateField?.SetValue(_sellerService, invalidPath);

            // Act
            var sellers = _sellerService.GetSellerById("1");

            // Assert
            Assert.Null(sellers);
        }

        [Fact]
        public void GetSellerById_ReturnsNull_WhenSellerDoesNotExist()
        {
            // Arrange
            var sellers = new List<SellerDetail>
            {
                new SellerDetail { Id = "1", Name = "Seller 1" },
                new SellerDetail { Id = "2", Name = "Seller 2" }
            };
            File.WriteAllText(_testJsonPath, JsonSerializer.Serialize(sellers));
            var privateField = typeof(SellerService).GetField("_dataPath", System.Reflection.BindingFlags.NonPublic | System.Reflection.BindingFlags.Instance);
            privateField?.SetValue(_sellerService, _testJsonPath);

            // Act
            var result = _sellerService.GetSellerById("3");

            // Assert
            Assert.Null(result);

            // Cleanup
            File.Delete(_testJsonPath);
        }

        [Fact]
        public void GetSellerById_ReturnsSeller_WhenSellerExists()
        {
            // Arrange
            var sellers = new List<SellerDetail>
            {
                new SellerDetail { Id = "1", Name = "Seller 1" },
                new SellerDetail { Id = "2", Name = "Seller 2" }
            };
            File.WriteAllText(_testJsonPath, JsonSerializer.Serialize(sellers));
            var privateField = typeof(SellerService).GetField("_dataPath", System.Reflection.BindingFlags.NonPublic | System.Reflection.BindingFlags.Instance);
            privateField?.SetValue(_sellerService, _testJsonPath);

            // Act
            var result = _sellerService.GetSellerById("1");

            // Assert
            Assert.NotNull(result);
            Assert.Equal("1", result.Id);
            Assert.Equal("Seller 1", result.Name);

            // Cleanup
            File.Delete(_testJsonPath);
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
