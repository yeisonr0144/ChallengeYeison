using System;
using System.Collections.Generic;
using System.IO;
using System.Text.Json;
using ChallengeYeison.Server.Interface;
using ChallengeYeison.Server.Models;

namespace ChallengeYeison.Server.Services
{
    public class ProductoService : IProductoService
    {
        private readonly string _jsonPath = "Data/Producto.json";
        private List<Producto>? _cachedProducts;

        public Producto GetById(string id)
        {
            try
            {
                if (_cachedProducts == null)
                {
                    LoadProducts();
                }

                // Buscar el producto por ID
                var producto = _cachedProducts?.Find(p => p.Id == id);

                // Si no se encuentra, devolver null
                return producto;
            }
            catch (FileNotFoundException ex)
            {
                throw new InvalidOperationException("Error al leer el archivo de productos", ex);
            }
            catch (Exception ex)
            {
                throw new InvalidOperationException($"Error al obtener el producto con ID {id}", ex);
            }
        }




        public List<Producto> LoadProducts()
        {
            if (!File.Exists(_jsonPath))
            {
                throw new FileNotFoundException("El archivo de productos no existe en la ruta especificada.");
            }

            try
            {
                var jsonString = File.ReadAllText(_jsonPath);
                return _cachedProducts = JsonSerializer.Deserialize<List<Producto>>(jsonString, new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true,
                    PropertyNamingPolicy = JsonNamingPolicy.CamelCase
                }) ?? new List<Producto>();
            }
            catch (JsonException ex)
            {
                throw new JsonException($"Error al deserializar el archivo de productos: {ex.Message}");
            }
        }


        public void ClearCache()
        {
            _cachedProducts = null;
        }
    }
}

