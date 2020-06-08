using Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.IRepositories
{
    public interface IFlightRepository
    {
        Task Save();
        Task<IEnumerable<Flight>> GetFlights(List<Plane> planes);
        Task<Flight> GetFlight(int id);
        void DeleteFlight(Flight flight);
    }
}
