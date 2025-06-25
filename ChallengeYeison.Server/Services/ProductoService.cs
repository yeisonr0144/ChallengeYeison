
using ChallengeYeison.Server.Models;
using System.Text.Json;

namespace ChallengeYeison.Server.Services
{
    public class ProductoService
    {
        private readonly string _jsonPath = "Data/Producto.json";

        public List<Producto> GetAll()
        {
            var json = File.ReadAllText(_jsonPath);
            return JsonSerializer.Deserialize<List<Producto>>(json, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
        }

        public Producto? GetById(string id)
        {
            return GetAll().FirstOrDefault(p => p.Id == id);
        }
    }
}
