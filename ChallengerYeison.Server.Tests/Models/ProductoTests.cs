using ChallengeYeison.Server.Models;
using System;
using Xunit;

namespace ChallengerYeison.Server.Tests.Models
{
    public class ProductoTests
    {
        [Fact]
        public void Producto_InitializesWithDefaultValues()
        {
            // Arrange & Act
            var producto = new Producto();

            // Assert
            Assert.NotNull(producto.Id);
            Assert.Equal(string.Empty, producto.Id);
            Assert.NotNull(producto.Title);
            Assert.Equal(string.Empty, producto.Title);
            Assert.Equal(0m, producto.Price);
            Assert.Equal(0, producto.Stock);
            Assert.NotNull(producto.Images);
            Assert.Empty(producto.Images);
            Assert.NotNull(producto.Payment);
            Assert.Empty(producto.Payment);
            Assert.NotNull(producto.Seller);
            Assert.NotNull(producto.Specifications);
            Assert.NotNull(producto.Variants);
            Assert.Empty(producto.Variants);
            Assert.Equal("Nuevo", producto.Condition);
            Assert.Equal(0, producto.SoldQuantity);
            Assert.NotNull(producto.Rating);
            Assert.NotNull(producto.Benefits);
            Assert.Empty(producto.Benefits);
            Assert.Equal(string.Empty, producto.DeliveryTime);
            Assert.False(producto.HasFreeShipping);
            Assert.False(producto.HasWarranty);
            Assert.Equal(0, producto.WarrantyMonths);
            Assert.NotNull(producto.Characteristics);
        }

        [Fact]
        public void Characteristics_InitializesWithDefaultValues()
        {
            // Arrange & Act
            var characteristics = new Characteristics();

            // Assert
            Assert.NotNull(characteristics.MainFeatures);
            Assert.NotNull(characteristics.OtherFeatures);
        }

        [Fact]
        public void MainFeatures_InitializesWithDefaultValues()
        {
            // Arrange & Act
            var mainFeatures = new MainFeatures();

            // Assert
            Assert.Equal(string.Empty, mainFeatures.Brand);
            Assert.Equal(string.Empty, mainFeatures.Model);
            Assert.Equal(string.Empty, mainFeatures.Gender);
            Assert.Equal(string.Empty, mainFeatures.Age);
            Assert.Equal(string.Empty, mainFeatures.GarmentType);
            Assert.Equal(string.Empty, mainFeatures.MainMaterial);
            Assert.Equal(string.Empty, mainFeatures.FabricDesign);
            Assert.Equal(string.Empty, mainFeatures.PrintDesign);
        }

        [Fact]
        public void OtherFeatures_InitializesWithDefaultValues()
        {
            // Arrange & Act
            var otherFeatures = new OtherFeatures();

            // Assert
            Assert.Equal(string.Empty, otherFeatures.IsSportsWear);
            Assert.Equal(string.Empty, otherFeatures.RecommendedUses);
            Assert.Equal(string.Empty, otherFeatures.FabricType);
            Assert.Equal(string.Empty, otherFeatures.MainMaterial);
            Assert.Equal(string.Empty, otherFeatures.SleeveType);
            Assert.Equal(string.Empty, otherFeatures.NeckType);
            Assert.Equal(string.Empty, otherFeatures.HemType);
            Assert.Equal(string.Empty, otherFeatures.HasRecycledMaterials);
        }

        [Fact]
        public void PaymentOption_InitializesWithDefaultValues()
        {
            // Arrange & Act
            var paymentOption = new PaymentOption();

            // Assert
            Assert.Equal(string.Empty, paymentOption.Method);
            Assert.Equal(0, paymentOption.Installments);
            Assert.Equal(0m, paymentOption.Amount);
            Assert.False(paymentOption.HasInterest);
            Assert.Equal(string.Empty, paymentOption.CardType);
        }

        [Fact]
        public void ProductSpecs_InitializesWithDefaultValues()
        {
            // Arrange & Act
            var productSpecs = new ProductSpecs();

            // Assert
            Assert.Equal(string.Empty, productSpecs.Processor);
            Assert.Equal(string.Empty, productSpecs.RAM);
            Assert.Equal(string.Empty, productSpecs.Storage);
            Assert.Equal(string.Empty, productSpecs.GraphicsCard);
            Assert.Equal(string.Empty, productSpecs.Screen);
            Assert.Equal(string.Empty, productSpecs.OperatingSystem);
            Assert.Equal(string.Empty, productSpecs.Battery);
            Assert.Equal(string.Empty, productSpecs.Weight);
            Assert.NotNull(productSpecs.AdditionalSpecs);
            Assert.Empty(productSpecs.AdditionalSpecs);
        }

        [Fact]
        public void ProductVariant_InitializesWithDefaultValues()
        {
            // Arrange & Act
            var productVariant = new ProductVariant();

            // Assert
            Assert.Equal(string.Empty, productVariant.Type);
            Assert.Equal(string.Empty, productVariant.Name);
            Assert.Equal(string.Empty, productVariant.Value);
            Assert.False(productVariant.IsSelected);
            Assert.Equal(string.Empty, productVariant.ImageUrl);
            Assert.Equal(0m, productVariant.PriceModifier);
            Assert.Equal(0, productVariant.Stock);
            Assert.NotNull(productVariant.Images);
            Assert.Empty(productVariant.Images);
        }

        [Fact]
        public void Rating_InitializesWithDefaultValues()
        {
            // Arrange & Act
            var rating = new Rating();

            // Assert
            Assert.Equal(0m, rating.Average);
            Assert.Equal(0, rating.TotalReviews);
            Assert.NotNull(rating.Breakdown);
            Assert.Empty(rating.Breakdown);
            Assert.NotNull(rating.TopReviews);
            Assert.Empty(rating.TopReviews);
        }

        [Fact]
        public void Review_InitializesWithDefaultValues()
        {
            // Arrange & Act
            var review = new Review();

            // Assert
            Assert.Equal(string.Empty, review.UserName);
            Assert.Equal(0, review.Rating);
            Assert.Equal(string.Empty, review.Comment);
            Assert.Equal(default(DateTime), review.Date);
            Assert.False(review.IsVerifiedPurchase);
            Assert.Equal(0, review.LikesCount);
        }
    }
}
