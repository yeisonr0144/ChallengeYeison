using ChallengeYeison.Server.Models;
using Newtonsoft.Json;
using Xunit;

namespace ChallengerYeison.Server.Tests.Models
{
    public class ErrorResponseTests
    {
        [Fact]
        public void ErrorResponse_SerializesCorrectly()
        {
            // Arrange
            var errorResponse = new ErrorResponse { Message = "Test error message" };

            // Act
            var json = JsonConvert.SerializeObject(errorResponse);
            var deserialized = JsonConvert.DeserializeObject<ErrorResponse>(json);

            // Assert
            Assert.NotNull(deserialized);
            Assert.Equal("Test error message", deserialized.Message);
        }

        [Fact]
        public void ErrorResponse_DefaultValues_AreCorrect()
        {
            // Arrange
            var errorResponse = new ErrorResponse();

            // Act & Assert
            Assert.Null(errorResponse.Message); // Por defecto, Message debería ser null
        }
    }
}
