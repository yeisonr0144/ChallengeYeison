using ChallengeYeison.Server.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace ChallengeYeison.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductoController : ControllerBase
    {
        private readonly IProductoService _service; // Cambiado a IProductoService
        private readonly ILogger<ProductoController> _logger;

        public ProductoController(IProductoService service, ILogger<ProductoController> logger) // Cambiado a IProductoService
        {
            _service = service;
            _logger = logger;
        }

        [HttpGet("{id}")]
        public ActionResult GetById(string id)
        {
            try
            {
                var product = _service.GetById(id); // Usando la interfaz
                if (product == null)
                {
                    _logger.LogWarning("Producto no encontrado: {Id}", id);
                    return NotFound(new { message = $"Producto con ID {id} no encontrado" });
                }

                return Ok(product);
            }
            catch (ArgumentException ex)
            {
                _logger.LogWarning(ex, "Solicitud inválida para ID: {Id}", id);
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al obtener el producto: {Id}", id);
                return StatusCode(500, new { message = "Error interno del servidor al obtener el producto" });
            }
        }

        [HttpPost("clear-cache")]
        public ActionResult ClearCache()
        {
            try
            {
                _service.ClearCache(); // Usando la interfaz
                return Ok(new { message = "Cache limpiado exitosamente" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al limpiar el cache");
                return StatusCode(500, new { message = "Error al limpiar el cache" });
            }
        }
    }
}
