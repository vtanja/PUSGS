using Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.IRepositories
{
    public interface IBonusPointsDiscountRepository : IDisposable
    {
        Task<List<BonusPointsDiscount>>GetBonusPointsDiscount();
        void Update(BonusPointsDiscount bpDiscount);
        Task Save();
    }
}
