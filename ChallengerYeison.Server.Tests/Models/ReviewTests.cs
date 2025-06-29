using ChallengeYeison.Server.Models;
using Xunit;

namespace ChallengerYeison.Server.Tests.Models
{
    public class ReviewTests
    {
        [Fact]
        public void ProductReview_InitializesWithDefaultValues()
        {
            // Arrange & Act
            var productReview = new ProductReview();

            // Assert
            Assert.Null(productReview.ProductId);
            Assert.Null(productReview.Rating);
            Assert.Null(productReview.RatingDetails);
            Assert.Null(productReview.Characteristics);
            Assert.Null(productReview.Reviews);
        }

        [Fact]
        public void ProductRating_InitializesWithDefaultValues()
        {
            // Arrange & Act
            var productRating = new ProductRating();

            // Assert
            Assert.Equal(0, productRating.Average);
            Assert.Equal(0, productRating.TotalReviews);
        }

        [Fact]
        public void RatingDetail_InitializesWithDefaultValues()
        {
            // Arrange & Act
            var ratingDetail = new RatingDetail();

            // Assert
            Assert.Equal(0, ratingDetail.Stars);
            Assert.Equal(0, ratingDetail.Percent);
        }

        [Fact]
        public void Characteristic_InitializesWithDefaultValues()
        {
            // Arrange & Act
            var characteristic = new Characteristic();

            // Assert
            Assert.Null(characteristic.Name);
            Assert.Equal(0, characteristic.Stars);
        }

        [Fact]
        public void ReviewDetail_InitializesWithDefaultValues()
        {
            // Arrange & Act
            var reviewDetail = new ReviewDetail();

            // Assert
            Assert.Equal(0, reviewDetail.Rating);
            Assert.Null(reviewDetail.Text);
            Assert.Equal(0, reviewDetail.Votes);
            Assert.Null(reviewDetail.Date);
        }
    }
}
