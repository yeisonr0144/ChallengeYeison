using System.Net.Http;
using System.Threading.Tasks;
using Xunit;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.VisualStudio.TestPlatform.TestHost;

namespace ChallengeYeison.Server.Tests.Integration
{
    public class ApiIntegrationTests : IClassFixture<WebApplicationFactory<Program>>
    {
        private readonly HttpClient _client;

        public ApiIntegrationTests(WebApplicationFactory<Program> factory)
        {
            // Crea un cliente HTTP para interactuar con la API simulada
            _client = factory.CreateClient();
        }

        [Fact]
        public async Task GetSellerById_ReturnsSuccessStatusCode()
        {
            // Act
            var response = await _client.GetAsync("/api/seller/1");

            // Assert
            response.EnsureSuccessStatusCode(); // Verifica que el código de estado sea 200 OK
        }

        [Fact]
        public async Task GetSellerById_ReturnsCorrectSeller()
        {
            // Act
            var response = await _client.GetAsync("/api/seller/1");
            response.EnsureSuccessStatusCode();

            var content = await response.Content.ReadAsStringAsync();

            // Assert
            Assert.Contains("\"id\":\"1\"", content); // Verifica que el contenido incluye el ID del vendedor
            Assert.Contains("\"name\":\"Seller 1\"", content); // Verifica que el contenido incluye el nombre del vendedor
        }

        [Fact]
        public async Task GetNonExistentSeller_ReturnsNotFound()
        {
            // Act
            var response = await _client.GetAsync("/api/seller/999");

            // Assert
            Assert.Equal(System.Net.HttpStatusCode.NotFound, response.StatusCode); // Verifica que el código de estado sea 404 Not Found
        }
    }
}
