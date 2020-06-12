using Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.IRepositories
{
    public interface IAirlineRateRepository :IDisposable
    {
        void AddAirlineRate(AirlineRate airlineRate);
        Task<List<AirlineRate>> GetAirlineRates(int airlineId);
        Task Save();
    }
}
