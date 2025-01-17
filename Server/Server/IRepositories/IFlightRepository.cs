﻿using Server.Models;
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
        Task<IEnumerable<Flight>> GetAllFlights();
        Task<Flight> GetFlight(int id);
        void DeleteFlight(Flight flight);
        Task<IEnumerable<Flight>> SearchFlights(SearchFlightModel model);
        Task<IEnumerable<Flight>> SearchMultiFlights(SearchFlightModel model);
        Task<IEnumerable<Tuple<Flight, Flight>>> SearchRoundFlights(SearchFlightModel model);
        Task<IEnumerable<Seat>> GetOccupiedSeats(int flightId);
        Task<IEnumerable<Flight>>GetAirlineFlights(int airlineId);
        Task<Dictionary<string, double>> GetAirlineFlightRate(int airlineId);
    }
}
