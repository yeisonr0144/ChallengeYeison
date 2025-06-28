using System.Text.Json;
using ChallengeYeison.Server.Models;
using Microsoft.Extensions.Logging;

namespace ChallengeYeison.Server.Services
{
    public class SellerService
    {
        private readonly string _dataPath;
        private List<SellerDetail> _sellers;
        private readonly ILogger<SellerService> _logger;

        public SellerService(IWebHostEnvironment webHostEnvironment, ILogger<SellerService> logger)
        {
            _dataPath = Path.Combine(webHostEnvironment.ContentRootPath, "Data", "Seller.json");
            _logger = logger;
            _sellers = LoadSellers();
        }

        private List<SellerDetail> LoadSellers()
        {
            if (!File.Exists(_dataPath))
            {
                _logger.LogWarning("El archivo de vendedores no existe en la ruta: {Path}", _dataPath);
                return new List<SellerDetail>();
            }

            try
            {
                var jsonString = File.ReadAllText(_dataPath);
                _logger.LogInformation("Contenido del archivo Seller.json: {Json}", jsonString);
                
                var sellers = JsonSerializer.Deserialize<List<SellerDetail>>(jsonString, new JsonSerializerOptions 
                { 
                    PropertyNameCaseInsensitive = true,
                    PropertyNamingPolicy = JsonNamingPolicy.CamelCase
                }) ?? new List<SellerDetail>();

                _logger.LogInformation("Vendedores cargados: {Count}", sellers.Count);
                foreach (var seller in sellers)
                {
                    _logger.LogInformation("Vendedor cargado - ID: {Id}, Nombre: {Name}", seller.Id, seller.Name);
                }

                return sellers;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al cargar los vendedores");
                throw new InvalidOperationException($"Error al cargar los vendedores: {ex.Message}", ex);
            }
        }

        public SellerDetail? GetSellerById(string id)
        {
            if (string.IsNullOrWhiteSpace(id))
            {
                throw new ArgumentException("El ID del vendedor no puede estar vacío", nameof(id));
            }

            _logger.LogInformation("Buscando vendedor con ID: {Id}", id);
            var seller = _sellers.FirstOrDefault(s => s.Id.Equals(id, StringComparison.OrdinalIgnoreCase));
            
            if (seller == null)
            {
                _logger.LogWarning("No se encontró el vendedor con ID: {Id}", id);
            }
            else
            {
                _logger.LogInformation("Vendedor encontrado - ID: {Id}, Nombre: {Name}", seller.Id, seller.Name);
            }

            return seller;
        }
    }
} 