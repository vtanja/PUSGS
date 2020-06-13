using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Server.Interfaces;
using Server.IRepositories;
using Server.IServices;
using Server.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Services
{
    public class CarReservationService : ICarReservationService
    {
        private ICarReservationRepository carReservationRepository;
        private IReservedDateRepository reservedDateRepository;
        private IDiscountDateRepository discountDateRepository;
        private ICarRepository carRepository;

        public CarReservationService(ICarRepository carRepository,ICarReservationRepository carReservationRepository, IReservedDateRepository reservedDateRepository,IDiscountDateRepository discountDateRepository)
        {
            this.carReservationRepository = carReservationRepository;
            this.reservedDateRepository = reservedDateRepository;
            this.discountDateRepository = discountDateRepository;
            this.carRepository = carRepository;
        }
        public async Task<string> AddReservation(CarReservation carReservation)
        {
            var car = await carRepository.GetCarWithReservationData(carReservation.CarId);

            carRepository.UpdateCar(car);

            if (await reservedDateRepository.AreDatesReserved(carReservation.CarId, carReservation.PickUpDate, carReservation.DropOffDate))
                return "Not all dates in this range are still available. Please reload page to get changed results.";

            carReservation.DateCreated = DateTime.Now;
            carReservation.TotalPrice = (carReservation.DropOffDate.Date - carReservation.PickUpDate.Date).TotalDays * carReservation.PricePerDay;
            carRepository.AddReservationToCar(car, carReservation);

            for (DateTime date = carReservation.PickUpDate; date < carReservation.DropOffDate; date = date.AddDays(1))
            {
                var reservedDate = new ReservedDate()
                {
                    CarId = carReservation.CarId,
                    Date = date
                };

                carRepository.AddReservedDateToCar(car,reservedDate);
            }
            try
            {
                await carReservationRepository.Save();
            }
            catch(DbUpdateConcurrencyException dbConcurencyException)
            {
                return "Your data is not totally updated. It looks like some changes happend or another user has reserved those dates.Please reload page to get up to dated values.";
            }
            catch {
                return "error";
            }
            return "success";
        }
        public async Task<string> AddQuickReservation(CarReservation carReservation)
        {
            if (await reservedDateRepository.AreDatesReserved(carReservation.CarId, carReservation.PickUpDate, carReservation.DropOffDate))
                return "Not all dates in this range are still available. Please reload page to get changed results.";

            List<DiscountDate> discountDates = new List<DiscountDate>();
            discountDates = await discountDateRepository.GetCarDiscountDatesObjects(carReservation.CarId);

            carReservation.DateCreated = DateTime.Now;

            double totalPrice = 0;
            var car = await carRepository.GetCarByID(carReservation.CarId);

            if (car == null || car.IsDeleted)
                return "Adding car reservation failed.No car was found.Please reload page to get up to dated data.";

            for (DateTime date = carReservation.PickUpDate; date < carReservation.DropOffDate; date = date.AddDays(1))
            {
                var reservedDate = new ReservedDate()
                {
                    CarId = carReservation.CarId,
                    Date = date
                };

                reservedDateRepository.AddReservedDate(reservedDate);
                var discount = discountDates.Find(d => d.Date.Date == date.Date);
                if (discount == null)
                {
                    return "error";
                }
                totalPrice += car.Price - (car.Price * (discount.Discount / 100));
            }

            carReservation.TotalPrice = totalPrice;
            carReservationRepository.AddCarReservation(carReservation);

            try
            {
                await carReservationRepository.Save();
            }
            catch
            {
                return "error";
            }
            return "success_" + carReservation.Id;
        }
        public async Task<List<CarReservation>> GetUserCarReservations(string userId)
        {
            return await carReservationRepository.GetUserCarReservation(userId);
        }
        public async Task<string> GetDailyReservationReport(int companyId)
        {
            var ret = await carReservationRepository.GetDailyReservationReport(companyId);
            string titleString = "Car reservations chart for today - " + DateTime.Now.ToShortDateString();

            return (JsonConvert.SerializeObject(new
            {
                labels = ret.Keys,
                data = ret.Values,
                title = titleString

            })); ;
        }
        public async Task<string> GetWeeklyReservationReport(int companyId)
        {
            DateTime endDate = DateTime.Now;
            DateTime startDate = DateTime.Now.Subtract(TimeSpan.FromDays(7));

            var ret = await carReservationRepository.GetRangeReservationReport(companyId, startDate, endDate);

            string titleString = "Car reservations chart for last 7 days, from " + DateTime.Now.Subtract(TimeSpan.FromDays(7)).ToShortDateString() + " to " + DateTime.Now.ToShortDateString();


            return (JsonConvert.SerializeObject(new
            {
                labels = ret.Keys,
                data = ret.Values,
                title = titleString

            }));
        }
        public async Task<string> GetMonthlyReservationReport(int companyId)
        {
            DateTime endDate = DateTime.Now;
            DateTime startDate = DateTime.Now.AddMonths(-1);

            var ret = await carReservationRepository.GetRangeReservationReport(companyId, startDate, endDate);

            string titleString = "Car reservations chart for last mont, from " + DateTime.Now.AddMonths(-1).ToShortDateString() + " to " + DateTime.Now.ToShortDateString();


            return (JsonConvert.SerializeObject(new
            {
                labels = ret.Keys,
                data = ret.Values,
                title = titleString

            }));
        }
        public async Task<string> GetMonthlyIncomes(int companyId, int month, int year)
        {
            var ret = await carReservationRepository.GetMonthlyIncomes(companyId, month, year);

            var daysNum = DateTime.DaysInMonth(year, month);

            for (int i = 1; i <= daysNum; i++)
            {
                if (!ret.ContainsKey(i))
                    ret.Add(i, 0);
            }

            var resultDictionary = ret.OrderBy(x => x.Key).ToDictionary(x => x.Key, x => x.Value);

            string titleString = "Company incomes for " + CultureInfo.CurrentCulture.DateTimeFormat.GetMonthName(month) + " " + year.ToString();


            return (JsonConvert.SerializeObject(new
            {
                labels = resultDictionary.Keys,
                data = resultDictionary.Values,
                title = titleString

            }));
        }
        public async Task<string> GetAnnualIncomes(int companyId, int year)
        {
            var ret = await carReservationRepository.GetAnnualIncomes(companyId, year);

            Dictionary<string, double> result = new Dictionary<string, double>();

            for (int i = 1; i <= 12; i++)
            {
                if (!ret.ContainsKey(i))
                {
                    ret.Add(i, 0);
                }
            }

            string titleString = "Company incomes for " + year.ToString();

            for (int i = 1; i <= 12; i++)
            {
                var str = CultureInfo.CurrentCulture.DateTimeFormat.GetMonthName(i);
                result.Add(str, ret[i]);
            }

            return (JsonConvert.SerializeObject(new
            {
                labels = result.Keys,
                data = result.Values,
                title = titleString

            }));
        }
    }
}
