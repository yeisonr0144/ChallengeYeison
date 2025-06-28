using System.Text.Json.Serialization;

namespace ChallengeYeison.Server.Models
{
    public class SellerDetail
    {
        public string Id { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Level { get; set; } = string.Empty;
        public string LevelDescription { get; set; } = string.Empty;
        public List<SellerBadge> Badges { get; set; } = new List<SellerBadge>();
        public SellerMetrics Metrics { get; set; } = new SellerMetrics();
    }

    public class SellerBadge
    {
        public string Type { get; set; } = string.Empty;
        public string Text { get; set; } = string.Empty;
        public string Icon { get; set; } = string.Empty;
    }

    public class SellerMetrics
    {
        public int CompletedSales { get; set; }
        public decimal CustomerServiceRating { get; set; }
        public decimal OnTimeDeliveryRating { get; set; }
        public decimal CancellationRate { get; set; }
        public decimal ClaimRate { get; set; }
        public List<SellerBadge> Badges { get; set; } = new List<SellerBadge>();
    }
} 