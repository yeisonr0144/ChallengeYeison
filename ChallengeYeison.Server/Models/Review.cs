using System.Text.Json.Serialization;

namespace ChallengeYeison.Server.Models
{
    public class ProductReview
    {
        public string? ProductId { get; set; }
        public ProductRating? Rating { get; set; }
        public List<RatingDetail>? RatingDetails { get; set; }
        public List<Characteristic>? Characteristics { get; set; }
        public List<ReviewDetail>? Reviews { get; set; }
    }

    public class ProductRating
    {
        public double Average { get; set; }
        public int TotalReviews { get; set; }
    }

    public class RatingDetail
    {
        public int Stars { get; set; }
        public int Percent { get; set; }
    }

    public class Characteristic
    {
        public string? Name { get; set; }
        public int Stars { get; set; }
    }

    public class ReviewDetail
    {
        public int Rating { get; set; }
        public string? Text { get; set; }
        public int Votes { get; set; }
        public string? Date { get; set; }
    }
} 