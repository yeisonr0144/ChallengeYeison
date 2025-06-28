using ChallengeYeison.Server.Models;
using ChallengeYeison.Server.Services;
using Microsoft.AspNetCore.Mvc;

namespace ChallengeYeison.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReviewController : ControllerBase
    {
        private readonly ReviewService _reviewService;
        private readonly ILogger<ReviewController> _logger;

        public ReviewController(ReviewService reviewService, ILogger<ReviewController> logger)
        {
            _reviewService = reviewService;
            _logger = logger;
        }

        [HttpGet("{productId}")]
        public ActionResult<ProductReview> GetByProductId(string productId)
        {
            try
            {
                _logger.LogInformation($"Obteniendo reviews para el producto: {productId}");
                var review = _reviewService.GetByProductId(productId);

                if (review == null)
                {
                    _logger.LogWarning($"No se encontraron reviews para el producto: {productId}");
                    return NotFound($"No se encontraron reviews para el producto con ID: {productId}");
                }

                return Ok(review);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error al obtener las reviews del producto: {productId}");
                return StatusCode(500, "Error interno del servidor al obtener las reviews");
            }
        }
    }
} 