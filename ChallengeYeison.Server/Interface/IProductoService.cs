using ChallengeYeison.Server.Models;

namespace ChallengeYeison.Server.Interface
{
    public interface IProductoService
    {
        Producto? GetById(string id);
        void ClearCache(); 
    }
}
