using ChallengeYeison.Server.Models;

namespace ChallengeYeison.Server.Services
{
    public interface ISellerService
    {
        SellerDetail? GetSellerById(string id);
        List<SellerDetail> LoadSellers();
    }
}
