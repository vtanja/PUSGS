using Server.IServices;
using Server.Models;
using Server.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Services
{
    public class AirlineRateService : IAirlineRateService
    {
        private FlightReservationRepository flightReservationRepository;
        private AirlineRepository airlineRepository;
        private AirlineRateRepository airlineRateRepository;

        public AirlineRateService(AirlineRateRepository airlineRateRepository, FlightReservationRepository flightReservationRepository, AirlineRepository airlineRepository)
        {
            this.flightReservationRepository = flightReservationRepository;
            this.airlineRepository = airlineRepository;
            this.airlineRateRepository = airlineRateRepository;
        }

        public async Task<bool> AddAirlineRate(RateModel rateModel)
        {
            var flightReservation = await flightReservationRepository.GetFlightReservation(rateModel.ReservationId);

            if (CanAddRate(flightReservation))
            {
                var airlineId = flightReservation.Flights.First().Plane.AirlineId;
                AirlineRate airlineRate = new AirlineRate()
                {
                    Rate = rateModel.Rate,
                    AirlineId = airlineId
                };

                airlineRateRepository.AddAirlineRate(airlineRate);
                try
                {
                    await airlineRateRepository.Save();
                }
                catch
                {
                    return false;
                }
                flightReservationRepository.UpdateFlightReservation(flightReservation);
                flightReservation.AirlineRated = true;

                try
                {
                    await flightReservationRepository.Save();
                }
                catch
                {
                    return false;
                }

                if (await UpdateAirlineRate(airlineId))
                    return true;
            }
            return false;
        }
            
        private bool CanAddRate(FlightReservation reservation)
        {
            if (reservation == null)
                return false;
            if (!reservation.AirlineRated)
                return true;
            return false;
        }

        private async Task<bool> UpdateAirlineRate(int airlineId)
        {
            var airlineRates = await airlineRateRepository.GetAirlineRates(airlineId);
            double avg = airlineRates.Average(r => r.Rate);
            var airline = await airlineRepository.GetAirlineById(airlineId);
            airline.Rate = avg;
            airlineRepository.UpdateAirlineRate(airline);
            try
            {
                await airlineRepository.Save();
            }
            catch
            {
                return false;
            }
            return true;
        }
    }
}
