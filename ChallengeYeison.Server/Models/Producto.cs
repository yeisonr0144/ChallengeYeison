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
    }
    public class PaymentOption
    {
        public string Method { get; set; } = string.Empty;
        public int Installments { get; set; }
        public decimal Amount { get; set; }
    }

    public class Seller
    {
        public string Name { get; set; } = string.Empty;
        public string Location { get; set; } = string.Empty;
        public string Reputation { get; set; } = string.Empty;  
    }
}
