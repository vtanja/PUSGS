using Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.IServices
{
    public interface IBonusPointsDiscountService
    {
        Task<List<BonusPointsDiscount>> GetBonusPointsDiscounts();
        Task<bool> UpdateBonusPointDiscounts(List<BonusPointsDiscount> bpDisocunts);
    }
}
