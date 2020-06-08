using Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.IServices
{
    public interface IFlightService
    {
        Task<IEnumerable<Flight>> GetFlights(List<Plane> planes);
        Task<Flight> GetFlight(int id);

        Task<bool> DeleteFlight(Flight flight);
    }
}
