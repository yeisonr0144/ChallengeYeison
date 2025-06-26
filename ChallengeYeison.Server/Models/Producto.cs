namespace ChallengeYeison.Server.Models
{
    public class Producto
    {
        public string Id { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public int Stock { get; set; }
        public List<string> Images { get; set; } = new List<string>();
        public List<PaymentOption> Payment { get; set; } = new List<PaymentOption>();
        public Seller Seller { get; set; } = new Seller();
        public decimal OriginalPrice { get; set; }  // Precio antes del descuento
        public int DiscountPercentage { get; set; } // Porcentaje de descuento
        public ProductSpecs Specifications { get; set; } = new ProductSpecs();
        public List<ProductVariant> Variants { get; set; } = new List<ProductVariant>();
        public string Condition { get; set; } = "Nuevo";
        public int SoldQuantity { get; set; }
        public Rating Rating { get; set; } = new Rating();
        public List<string> Benefits { get; set; } = new List<string>(); // Beneficios como "Envío gratis", "Garantía", etc.
        public string DeliveryTime { get; set; } = string.Empty; // Tiempo estimado de entrega
        public bool HasFreeShipping { get; set; }
        public bool HasWarranty { get; set; }
        public int WarrantyMonths { get; set; }
    }
    public class PaymentOption
    {
        public string Method { get; set; } = string.Empty;
        public int Installments { get; set; }
        public decimal Amount { get; set; }
        public bool HasInterest { get; set; }
        public string CardType { get; set; } = string.Empty; // "credit", "debit"
    }

    public class Seller
    {
        public string Id { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Location { get; set; } = string.Empty;
        public string Reputation { get; set; } = string.Empty;
        public string Level { get; set; } = string.Empty; // "MercadoLíder Platinum", etc.
        public string Logo { get; set; } = string.Empty;
        public SellerMetrics Metrics { get; set; } = new SellerMetrics();
        public bool IsOfficial { get; set; }
        public int YearsSellingOnPlatform { get; set; }
        public int TotalSales { get; set; }
    }

    public class SellerMetrics
    {
        public int CompletedSales { get; set; }
        public decimal CustomerServiceRating { get; set; } // Porcentaje
        public decimal OnTimeDeliveryRating { get; set; } // Porcentaje
        public decimal CancellationRate { get; set; }
        public decimal ClaimRate { get; set; }
        public List<SellerBadge> Badges { get; set; } = new List<SellerBadge>();
    }

    public class SellerBadge
    {
        public string Type { get; set; } = string.Empty; // "fast_shipping", "good_service", etc.
        public string Text { get; set; } = string.Empty;
        public string Icon { get; set; } = string.Empty;
    }

    public class ProductSpecs
    {
        public string Processor { get; set; } = string.Empty;
        public string RAM { get; set; } = string.Empty;
        public string Storage { get; set; } = string.Empty;
        public string GraphicsCard { get; set; } = string.Empty;
        public string Screen { get; set; } = string.Empty;
        public string OperatingSystem { get; set; } = string.Empty;
        public string Battery { get; set; } = string.Empty;
        public string Weight { get; set; } = string.Empty;
        public Dictionary<string, string> AdditionalSpecs { get; set; } = new Dictionary<string, string>();
    }

    public class ProductVariant
    {
        public string Type { get; set; } = string.Empty; // "color" o "capacity"
        public string Name { get; set; } = string.Empty;
        public string Value { get; set; } = string.Empty;
        public bool IsSelected { get; set; }
        public string ImageUrl { get; set; } = string.Empty;
        public decimal PriceModifier { get; set; } // Modificador de precio para esta variante
        public int Stock { get; set; } // Stock específico de esta variante
    }

    public class Rating
    {
        public decimal Average { get; set; }
        public int TotalReviews { get; set; }
        public List<RatingBreakdown> Breakdown { get; set; } = new List<RatingBreakdown>();
        public List<Review> TopReviews { get; set; } = new List<Review>();
    }

    public class RatingBreakdown
    {
        public int Stars { get; set; }
        public int Count { get; set; }
        public decimal Percentage { get; set; }
    }

    public class Review
    {
        public string UserName { get; set; } = string.Empty;
        public int Rating { get; set; }
        public string Comment { get; set; } = string.Empty;
        public DateTime Date { get; set; }
        public bool IsVerifiedPurchase { get; set; }
        public int LikesCount { get; set; }
    }
}
