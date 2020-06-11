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
    public class AirlineRateRepository : IAirlineRateRepository
    {
        private DataBaseContext _context;
        private bool disposed;

        public AirlineRateRepository(DataBaseContext context)
        {
            _context = context;
            disposed = false;
        }

        public void AddAirlineRate(AirlineRate airlineRate)
        {
            _context.AirlineRates.Add(airlineRate);
        }

        public async Task<List<AirlineRate>> GetAirlineRates(int airlineId)
        {
           return await _context.AirlineRates.Where(a => a.AirlineId == airlineId).ToListAsync();
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
