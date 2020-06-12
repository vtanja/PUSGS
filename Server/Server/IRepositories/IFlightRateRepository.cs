using Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.IRepositories
{
    public interface IFlightRateRepository:IDisposable
    {
        void AddFlightRate(FlightRate flightRate);
        Task<List<FlightRate>> GetFlightRates(int flightId);
        Task Save();
    }
}
