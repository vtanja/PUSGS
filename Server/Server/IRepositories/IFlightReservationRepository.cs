using Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.IRepositories
{
    public interface IFlightReservationRepository
    {
        Task Save();
        void PostFlightReservation(FlightReservation flightReservation);
        bool CheckSeats(FlightReservation flightReservation);
        Task<IEnumerable<FlightReservation>> GetFlightReservations(string userId);
        Task<FlightReservation> GetFlightReservation(int reservationId);
        void UpdateFlightReservation(FlightReservation flightReservation);
        void CancelReservation(FlightReservation reservation);
    }
}
