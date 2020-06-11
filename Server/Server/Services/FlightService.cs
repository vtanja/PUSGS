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

        public async Task<IEnumerable<Flight>> GetAllFlights()
        {
            return await flightRepository.GetAllFlights();
        }

        public async Task<Flight> GetFlight(int id)
        {
            return await flightRepository.GetFlight(id);
        }

        public async Task<IEnumerable<Flight>> GetFlights(List<Plane> planes)
        {
            return await flightRepository.GetFlights(planes);
        }

        public async Task<IEnumerable<Seat>> GetOccupiedSeats(int flightId)
        {
            return await flightRepository.GetOccupiedSeats(flightId);
        }

        public async Task<IEnumerable<Flight>> SearchFlights(SearchFlightModel model)
        {
            return await flightRepository.SearchFlights(model);
        }

        public async Task<IEnumerable<Flight>> SearchMultiFlights(SearchFlightModel model)
        {
            return await flightRepository.SearchMultiFlights(model);
        }

        public async Task<IEnumerable<Tuple<Flight, Flight>>> SearchRoundFlights(SearchFlightModel model)
        {
            return await flightRepository.SearchRoundFlights(model);
        }
    }
}
