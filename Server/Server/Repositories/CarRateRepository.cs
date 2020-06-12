using Microsoft.EntityFrameworkCore;
using Server.IRepositories;
using Server.Models;
using Server.Settings;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Repositories
{
    public class CarRateRepository : ICarRateRepository
    {
        private DataBaseContext _context;
        private bool disposed;

        public CarRateRepository(DataBaseContext context)
        {
            _context = context;
            disposed = false;
        }

        public void AddCarRate(CarRate carRate)
        {
            _context.CarRates.Add(carRate);
        }

        public async Task<List<CarRate>> GetCarRates (int carId)
        {
           return await _context.CarReservations.Include(c => c.CarRate).Where(c => c.CarId== carId && c.CarRateId!=null).Select(c=>c.CarRate).ToListAsync();
        }
        public async Task Save()
        {
            await _context.SaveChangesAsync();
        }

        protected virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    _context.Dispose();
                }
            }
            this.disposed = true;
        }
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}
