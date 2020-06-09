﻿using Newtonsoft.Json;
using Server.IRepositories;
using Server.IServices;
using Server.Models;
using Server.Settings;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Services
{
    public class CarReservationService : ICarReservationService
    {
        private ICarReservationRepository carReservationRepository;
        private IReservedDateRepository reservedDateRepository;

        public CarReservationService(ICarReservationRepository carReservationRepository,IReservedDateRepository reservedDateRepository)
        {
            this.carReservationRepository = carReservationRepository;
            this.reservedDateRepository = reservedDateRepository;
        }

        public async Task<string> AddReservation(CarReservation carReservation)
        {
            if (await reservedDateRepository.AreDatesReserved(carReservation.CarId,carReservation.PickUpDate,carReservation.DropOffDate))
                return"Not all dates in this range are still available. Please reload page to get changed results." ;

            carReservation.DateCreated = DateTime.Now;
            carReservationRepository.AddCarReservation(carReservation);

            for (DateTime date = carReservation.PickUpDate; date <= carReservation.DropOffDate; date = date.AddDays(1))
            {
                var reservedDate = new ReservedDate()
                {
                    CarId = carReservation.CarId,
                    Date = date
                };

                reservedDateRepository.AddReservedDate(reservedDate);
            }
            try
            {
               await carReservationRepository.Save();
            }
            catch
            {
                return "error";
            }
            return "success";
        }

        public async Task<IEnumerable<CarReservation>> GetUserCarReservations(string userId)
        {
            return await carReservationRepository.GetUserCarReservation(userId);
        }

        public async Task<string> GetDailyReservationReport(int companyId)
        {
            var ret = await carReservationRepository.GetDailyReservationReport(companyId);

            return (JsonConvert.SerializeObject(new
            {
                labels = ret.Keys,
                data = ret.Values

            }));
        }

        public async Task<string> GetWeeklyReservationReport(int companyId)
        {
            DateTime endDate = DateTime.Now;
            DateTime startDate = DateTime.Now.Subtract(TimeSpan.FromDays(7));

            var ret = await carReservationRepository.GetRangeReservationReport(companyId, startDate, endDate);

            return (JsonConvert.SerializeObject(new
            {
                labels = ret.Keys,
                data = ret.Values

            }));
        }
        public async Task<string> GetMonthlyReservationReport(int companyId)
        {
            DateTime endDate = DateTime.Now;
            DateTime startDate = DateTime.Now.AddMonths(-1);

            var ret = await carReservationRepository.GetRangeReservationReport(companyId, startDate, endDate);

            return (JsonConvert.SerializeObject(new
            {
                labels = ret.Keys,
                data = ret.Values

            }));
        }

    }
}
