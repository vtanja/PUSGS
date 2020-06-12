using Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.IRepositories
{
    public interface ICarRateRepository : IDisposable
    {
        void AddCarRate(CarRate carRate);
        Task<List<CarRate>> GetCarRates(int carId);
        Task Save();
    }
}
