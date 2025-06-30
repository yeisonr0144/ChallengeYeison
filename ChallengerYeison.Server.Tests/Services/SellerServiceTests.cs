using ChallengeYeison.Server.Models;
using ChallengeYeison.Server.Services;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Logging;
using Moq;
using System;
using System.Collections.Generic;
using System.Text.Json;
using Xunit;
using Xunit.Abstractions;

namespace ChallengerYeison.Server.Tests.Services
{
    public class SellerServiceTests
    {
        private readonly Mock<IWebHostEnvironment> _mockWebHostEnvironment;
        private readonly Mock<ILogger<SellerService>> _mockLogger;
        private readonly SellerService _sellerService;
        private readonly ITestOutputHelper _output;

        public SellerServiceTests(ITestOutputHelper output)
        {
            _output = output;
            _mockWebHostEnvironment = new Mock<IWebHostEnvironment>();
            _mockLogger = new Mock<ILogger<SellerService>>();
            _mockWebHostEnvironment.Setup(env => env.ContentRootPath).Returns(string.Empty);
            _sellerService = new SellerService(_mockWebHostEnvironment.Object, _mockLogger.Object);
        }

        [Fact]
        public void LoadSellers_ReturnsEmptyList_WhenJsonIsInvalid()
        {
            // Arrange
            var privateField = typeof(SellerService).GetField("_dataPath", System.Reflection.BindingFlags.NonPublic | System.Reflection.BindingFlags.Instance);
            _output.WriteLine($"Campo privado encontrado: {privateField != null}");
            privateField?.SetValue(_sellerService, "Invalid/Path/To/File.json");

            // Act
            var sellers = _sellerService.LoadSellers();

            // Assert
            Assert.Empty(sellers);
        }

        [Fact]
        public void GetSellerById_ReturnsNull_WhenSellerDoesNotExist()
        {
            // Arrange
            var sellers = new List<SellerDetail>
            {
                new() { Id = "1", Name = "Seller 1" },
                new() { Id = "2", Name = "Seller 2" }
            };
            var privateField = typeof(SellerService).GetField("_sellers", System.Reflection.BindingFlags.NonPublic | System.Reflection.BindingFlags.Instance);
            _output.WriteLine($"Campo privado encontrado: {privateField != null}");
            _output.WriteLine($"Sellers: {JsonSerializer.Serialize(sellers)}");
            privateField?.SetValue(_sellerService, sellers);

            // Act
            var result = _sellerService.GetSellerById("3");

            // Assert
            Assert.Null(result);
        }

        [Fact]
        public void GetSellerById_ReturnsSeller_WhenSellerExists()
        {
            // Arrange
            var sellers = new List<SellerDetail>
            {
                new() { Id = "1", Name = "Seller 1" },
                new() { Id = "2", Name = "Seller 2" }
            };
            var privateField = typeof(SellerService).GetField("_sellers", System.Reflection.BindingFlags.NonPublic | System.Reflection.BindingFlags.Instance);
            _output.WriteLine($"Campo privado encontrado: {privateField != null}");
            _output.WriteLine($"Sellers: {JsonSerializer.Serialize(sellers)}");
            privateField?.SetValue(_sellerService, sellers);

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
