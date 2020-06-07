using Newtonsoft.Json;
using Server.IRepositories;
using Server.IServices;
using Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Services
{
    public class DiscountDateService : IDiscountDateService
    {
        private IDiscountDateRepository discountDateRepository;

        public DiscountDateService(IDiscountDateRepository discountDateRepository)
        {
            this.discountDateRepository = discountDateRepository;
        }

        public async Task<string> AddDiscountDate(DiscountRangeModel discountRange)
        {
            //discountDateRepository.AddDiscountDate(discountDate);
            //try
            //{
            //    await discountDateRepository.Save();
            //}
            //catch
            //{
            //    return false;
            //}
            //return true;

            var alreadyOnDiscount = new List<DateTime>();
            alreadyOnDiscount = await discountDateRepository.GetCarDiscountDates(discountRange.CarId);

            var conflictDates = new List<string>();
            string conflictDatesStr = "";

            var dates = new List<DiscountDate>();
            discountRange.Dates.ForEach(date => {

                var discountDate = new DiscountDate()
                {
                    Date = Convert.ToDateTime(date),
                    CarId = discountRange.CarId,
                    Discount = discountRange.Discount
                };

                if (!alreadyOnDiscount.Contains(Convert.ToDateTime(date)))
                    discountDateRepository.AddDiscountDate(discountDate);
                else
                {
                    conflictDates.Add(date);
                    conflictDatesStr += date + " ";
                }
            });

            try
            {
                await discountDateRepository.Save();
            }
            catch
            {
                return "error";
            }

            if (conflictDates.Count == 0)
            {
                return "success";
            }
            else
            {
                return (JsonConvert.SerializeObject(new
                {
                    conflictDates = conflictDates,
                    conflictDatesStr = "There already exists discount for those dates: " + conflictDatesStr + ". Do you want to override this discount or to leave as is?"
                }));
            }


        }

        public async Task<bool> UpdateDiscountDates(DiscountRangeModel discountRange)
        {
            await foreach (var date in GetAsyncDate(discountRange.Dates))
            {

                var discountDate = await discountDateRepository.GetDiscountDate(Convert.ToDateTime(date));
                discountDateRepository.UpdateDiscountDate(discountDate);
                discountDate.Discount = discountRange.Discount;
                try
                {
                    await discountDateRepository.Save();
                }
                catch
                {
                    return false;
                }
            };

            return true;
        }

        static async IAsyncEnumerable<string> GetAsyncDate(List<string> dates)
        {
            for (int i = 0; i < dates.Count; i++)
            {
                await Task.Delay(1000);
                yield return dates[i];
            }
        }
    }
}
