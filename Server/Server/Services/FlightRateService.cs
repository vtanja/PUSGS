using Server.IServices;
using Server.Models;
using Server.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Services
{
    public class FlightRateService : IFlightRateService
    {
        private FlightRateRepository flightRateRepository;
        private FlightReservationRepository flightReservationRepository;
        private FlightRepository flightRepository;

        public FlightRateService(FlightRepository flightRepository, FlightRateRepository flightRateRepository, FlightReservationRepository flightReservationRepository)
        {
            this.flightRateRepository = flightRateRepository;
            this.flightReservationRepository = flightReservationRepository;
            this.flightRepository = flightRepository;
        }

        public async Task<bool> AddFlightRate(RateModel rateModel)
        {
            var flightReservation = await flightReservationRepository.GetFlightReservation(rateModel.ReservationId);

            if (CanAddRate(flightReservation))
            {
                foreach (Flight flight in flightReservation.Flights)
                {
                    FlightRate flightRate = new FlightRate()
                    {
                        Rate = rateModel.Rate,
                        FlightId=flight.Id
                    };

                    flightRateRepository.AddFlightRate(flightRate);
                }

                try
                {
                    await flightRateRepository.Save();
                }
                catch
                {
                    return false;
                }

                flightReservationRepository.UpdateFlightReservation(flightReservation);
                flightReservation.FlightRated = true;

                try
                {
                    await flightReservationRepository.Save();
                }
                catch
                {
                    return false;
                }
                if (await UpdateFlightRate(flightReservation))
                    return true;
            }
            return false;

        }

        private bool CanAddRate(FlightReservation reservation)
        {
            if (reservation == null)
                return false;
            //  var landingTime = new DateTime()
            if (!reservation.FlightRated)
                return true;
            return false;
        }

        private async Task<bool> UpdateFlightRate(FlightReservation flightReservation)
        {

            foreach (Flight flight in flightReservation.Flights)
            {
                var flightRates = await flightRateRepository.GetFlightRates(flight.Id);
                double avg = flightRates.Average(r => r.Rate);
                flight.Rate = avg;
                flightRepository.UpdateFlight(flight);
                try
                {
                    await flightRepository.Save();
                }
                catch
                {
                    return false;
                }

            }
            return true;
        }
    }
}
