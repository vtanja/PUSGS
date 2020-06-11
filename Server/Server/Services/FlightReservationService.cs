using Server.IServices;
using Server.Models;
using Server.Repositories;
using System;
using System.Collections.Generic;
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

        public async Task<IEnumerable<FlightReservation>> GetFlightReservations(string userId)
        {
            return await flightReservationRepository.GetFlightReservations(userId);
        }

        public async Task<bool> PostFlightReservation(FlightReservation flightReservation)
        {
            if (flightReservationRepository.CheckSeats(flightReservation))
            {
                flightReservationRepository.PostFlightReservation(flightReservation);
                //foreach (var item in flightReservation.Passengers)
                //{
                //    foreach (var item2 in item.Seats)
                //    {
                //        var flight = await flightRepository.GetFlight(item2.FlightId);
                //        flight.OccupiedSeats.Add(item2);

                //        flightRepository.UpdateFlight(flight);
                //    }
                //}
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
    }
}
