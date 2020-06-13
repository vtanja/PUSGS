using Newtonsoft.Json;
using Server.IServices;
using Server.Models;
using Server.Repositories;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Services
{
    public class FlightReservationService:IFlightReservationService
    {
        private FlightReservationRepository flightReservationRepository;
        private FlightRepository flightRepository;

        public FlightReservationService(FlightReservationRepository flightReservationRepository, FlightRepository flightRepository)
        {
            this.flightReservationRepository = flightReservationRepository;
            this.flightRepository = flightRepository;
        }

        public async Task<bool> CancelReservation(FlightReservation reservation)
        {
            flightReservationRepository.CancelReservation(reservation);
            try
            {
                await flightReservationRepository.Save();
            }
            catch (Exception)
            {
                return false;
            }
            return true;
        }

        public async Task<string> GetAnnualIncomes(int companyId, int year)
        {
            var ret = await flightReservationRepository.GetAnnualIncomes(companyId, year);

            Dictionary<string, double> result = new Dictionary<string, double>();

            for (int i = 1; i <= 12; i++)
            {
                if (!ret.ContainsKey(i))
                {
                    ret.Add(i, 0);
                }
            }

            string titleString = "Airline incomes for " + year.ToString();

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

        public async Task<string> GetDailyReservationReport(int companyId)
        {
            var ret = await flightReservationRepository.GetDailyReservationReport(companyId);
            string titleString = "Flight reservations chart for today - " + DateTime.Now.ToShortDateString();

            return (JsonConvert.SerializeObject(new
            {
                labels = ret.Keys,
                data = ret.Values,
                title = titleString

            })); ;
        }

        public async Task<IEnumerable<FlightReservation>> GetFlightReservations(string userId)
        {
            return await flightReservationRepository.GetFlightReservations(userId);
        }

        public async Task<string> GetMonthlyIncomes(int companyId, int year, int month)
        {
            var ret = await flightReservationRepository.GetMonthlyIncomes(companyId, month, year);

            var daysNum = DateTime.DaysInMonth(year, month);

            for (int i = 1; i <= daysNum; i++)
            {
                if (!ret.ContainsKey(i))
                    ret.Add(i, 0);
            }

            var resultDictionary = ret.OrderBy(x => x.Key).ToDictionary(x => x.Key, x => x.Value);

            string titleString = "Airline incomes for " + CultureInfo.CurrentCulture.DateTimeFormat.GetMonthName(month) + " " + year.ToString();


            return (JsonConvert.SerializeObject(new
            {
                labels = resultDictionary.Keys,
                data = resultDictionary.Values,
                title = titleString

            }));
        }

        public async Task<string> GetMonthlyReservationReport(int companyId)
        {
            DateTime endDate = DateTime.Now;
            DateTime startDate = DateTime.Now.AddMonths(-1);

            var ret = await flightReservationRepository.GetRangeReservationReport(companyId, startDate, endDate);

            string titleString = "Flight reservations chart for last mont, from " + DateTime.Now.AddMonths(-1).ToShortDateString() + " to " + DateTime.Now.ToShortDateString();


            return (JsonConvert.SerializeObject(new
            {
                labels = ret.Keys,
                data = ret.Values,
                title = titleString

            }));
        }

        public async Task<string> GetWeeklyReservationReport(int companyId)
        {
            DateTime endDate = DateTime.Now;
            DateTime startDate = DateTime.Now.Subtract(TimeSpan.FromDays(7));

            var ret = await flightReservationRepository.GetRangeReservationReport(companyId, startDate, endDate);

            string titleString = "Flight reservations chart for last 7 days, from " + DateTime.Now.Subtract(TimeSpan.FromDays(7)).ToShortDateString() + " to " + DateTime.Now.ToShortDateString();


            return (JsonConvert.SerializeObject(new
            {
                labels = ret.Keys,
                data = ret.Values,
                title = titleString

            }));
        }

        public async Task<bool> PostFlightReservation(FlightReservation flightReservation, List<int> flightIds)
        {
            if (flightReservationRepository.CheckSeats(flightReservation, flightIds))
            {
                flightReservationRepository.PostFlightReservation(flightReservation);
                try
                {
                    await flightReservationRepository.Save();
                }
                catch (Exception e)
                {
                    return false;
                }
                return true;
            }
            else
            {
                return false;
            }
            
        }

        public async Task<bool> UpdateReservations()
        {
            flightReservationRepository.UpdateReservations();
            try
            {
                await flightReservationRepository.Save();
            }
            catch (Exception)
            {
                return false;   
            }
            return true;
        }
    }
}
