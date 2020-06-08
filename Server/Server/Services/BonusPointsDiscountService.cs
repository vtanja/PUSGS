using Server.IRepositories;
using Server.IServices;
using Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Services
{
    public class BonusPointsDiscountService : IBonusPointsDiscountService
    {
        private IBonusPointsDiscountRepository bpDiscountRepository;

        public BonusPointsDiscountService(IBonusPointsDiscountRepository bpDiscountRepository)
        {
            this.bpDiscountRepository = bpDiscountRepository;
        }

        public async Task<List<BonusPointsDiscount>> GetBonusPointsDiscounts()
        {
            return await bpDiscountRepository.GetBonusPointsDiscount();
        }

        public async Task<bool> UpdateBonusPointDiscounts(List<BonusPointsDiscount> bpDisocunts)
        {
            
            foreach(BonusPointsDiscount bpDiscount in bpDisocunts)
            {
                bpDiscountRepository.Update(bpDiscount);
            }

            try
            {
                await bpDiscountRepository.Save();
            }
            catch
            {
                return false;
            }
            return true;
        }
    }
}
