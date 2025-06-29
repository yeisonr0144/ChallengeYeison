using ChallengeYeison.Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ChallengeYeison.Server.Tests.Models
{
    public class SellerTests
    {
        [Fact]
        public void SellerDetail_InitializesWithDefaultValues()
        {
            // Arrange & Act
            var sellerDetail = new SellerDetail();

            // Assert
            Assert.NotNull(sellerDetail.Id);
            Assert.NotNull(sellerDetail.Name);
            Assert.NotNull(sellerDetail.Level);
            Assert.NotNull(sellerDetail.LevelDescription);
            Assert.NotNull(sellerDetail.Badges);
            Assert.NotNull(sellerDetail.Metrics);
            Assert.Empty(sellerDetail.Badges);
        }

        [Fact]
        public void SellerBadge_InitializesWithDefaultValues()
        {
            // Arrange & Act
            var sellerBadge = new SellerBadge();

            // Assert
            Assert.NotNull(sellerBadge.Type);
            Assert.NotNull(sellerBadge.Text);
            Assert.NotNull(sellerBadge.Icon);
        }

        [Fact]
        public void SellerMetrics_InitializesWithDefaultValues()
        {
            // Arrange & Act
            var sellerMetrics = new SellerMetrics();

            // Assert
            Assert.Equal(0, sellerMetrics.CompletedSales);
            Assert.Equal(0m, sellerMetrics.CustomerServiceRating);
            Assert.Equal(0m, sellerMetrics.OnTimeDeliveryRating);
            Assert.Equal(0m, sellerMetrics.CancellationRate);
            Assert.Equal(0m, sellerMetrics.ClaimRate);
            Assert.NotNull(sellerMetrics.Badges);
            Assert.Empty(sellerMetrics.Badges);
        }

    }
}
