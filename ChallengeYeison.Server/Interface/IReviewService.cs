using ChallengeYeison.Server.Models;

namespace ChallengeYeison.Server.Interface
{
    public interface IReviewService
    {
        ProductReview? GetByProductId(string productId);
    }
}
