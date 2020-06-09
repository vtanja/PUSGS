using Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.IServices
{
    public interface IDiscountDateService 
    {
        Task<List<DiscountDate>> GetCarDiscountDates(int id);
        Task<string> AddDiscountDate(DiscountRangeModel discountRange);
        Task<bool> UpdateDiscountDates(DiscountRangeModel discountRange);
        Task<string> DeleteDiscountDates(string discountDateIds);
    }
}
