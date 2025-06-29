using Microsoft.AspNetCore.Mvc;
using ChallengeYeison.Server.Services;
using ChallengeYeison.Server.Models;
using Microsoft.Extensions.Logging;

namespace ChallengeYeison.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SellerController : ControllerBase
    {
        private readonly SellerService _sellerService;
        private readonly ILogger<SellerController> _logger;

        public SellerController(SellerService sellerService, ILogger<SellerController> logger)
        {
            _sellerService = sellerService;
            _logger = logger;
        }

        [HttpGet("{id}")]
        public ActionResult GetById(string id)
        {
            try
            {
                var seller = _sellerService.GetSellerById(id);
                if (seller == null)
                {
                    _logger.LogWarning("Vendedor no encontrado: {Id}", id);
                    return NotFound(new ErrorResponse { Message = $"Vendedor con ID {id} no encontrado" });
                }
                return Ok(seller);
            }
            catch (ArgumentException ex)
            {
                _logger.LogWarning(ex, "Solicitud inválida para ID: {Id}", id);
                return BadRequest(new ErrorResponse { Message = ex.Message });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al obtener el vendedor: {Id}", id);
                return StatusCode(500, new ErrorResponse { Message = "Error interno del servidor al obtener el vendedor" });
            }
        }


    }
}

