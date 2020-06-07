using Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.IServices
{
    public interface IDiscountDateService 
    {

        Task<string> AddDiscountDate(DiscountRangeModel discountRange);
        Task<bool> UpdateDiscountDates(DiscountRangeModel discountRange);
    }
}
