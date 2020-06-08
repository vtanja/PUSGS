using Server.IServices;
using Server.Models;
using Server.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Services
{
    public class FlightService:IFlightService
    {
        FlightRepository flightRepository;
        public FlightService(FlightRepository flightRepository)
        {
            this.flightRepository = flightRepository;
        }

        public async Task<bool> DeleteFlight(Flight flight)
        {
            flightRepository.DeleteFlight(flight);
            try
            {
                await flightRepository.Save();
            }
            catch (Exception)
            {
                return false;
            }
            return true;
        }

        public async Task<Flight> GetFlight(int id)
        {
            return await flightRepository.GetFlight(id);
        }

        public async Task<IEnumerable<Flight>> GetFlights(List<Plane> planes)
        {
            return await flightRepository.GetFlights(planes);
        }
    }
}
