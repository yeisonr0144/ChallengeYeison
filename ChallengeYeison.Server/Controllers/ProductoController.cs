using ChallengeYeison.Server.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ChallengeYeison.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductoController : ControllerBase
    {
        private readonly ProductoService _service;

        public ProductoController(ProductoService service)
        {
            _service = service;
        }

        [HttpGet("{id}")]
        public IActionResult GetById(string id)
        {
            var product = _service.GetById(id);
            if (product == null)
                return NotFound(new { message = "Producto no encontrado" });

            return Ok(product);
        }
    }
}
