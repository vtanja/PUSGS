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
        Task<List<DiscountDate>> GetCarDiscountDatesObjects(int carId);
        Task<DiscountDate> GetDiscountDate(DateTime date,int carId);
        Task<DiscountDate> GetDiscountDate(int id);
        void AddDiscountDate(DiscountDate discountDate);
        void DeleteDiscountDate(DiscountDate discountDate);
        void UpdateDiscountDate(DiscountDate discountDate);

        Task<bool> ExistsDate(int id);
        Task Save();
    }
}
