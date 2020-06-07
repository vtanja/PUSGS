using Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.IRepositories
{
    public interface IDiscountDateRepository: IDisposable
    {
        Task<List<DateTime>> GetCarDiscountDates(int carId);
        Task<DiscountDate> GetDiscountDate(DateTime date);
        void AddDiscountDate(DiscountDate discountDate);
        void UpdateDiscountDate(DiscountDate discountDate);
        Task Save();
    }
}
