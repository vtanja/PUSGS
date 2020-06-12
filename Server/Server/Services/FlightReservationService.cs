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
    }
}
