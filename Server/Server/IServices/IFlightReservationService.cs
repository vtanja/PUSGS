using Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.IServices
{
    public interface IFlightReservationService
    {
        Task<bool> PostFlightReservation(FlightReservation flightReservation, List<int> flightIds);
        Task<IEnumerable<FlightReservation>> GetFlightReservations(string userId);
        Task<bool> CancelReservation(FlightReservation reservation);
    }
}
