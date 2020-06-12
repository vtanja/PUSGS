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
    public class FlightRateRepository : IFlightRateRepository
    {
        private DataBaseContext _context;
        private bool disposed;

        public FlightRateRepository(DataBaseContext context)
        {
            _context = context;
            disposed = false;
        }

        public void AddFlightRate(FlightRate flightRate)
        {
            _context.FlightRates.Add(flightRate);
        }

        public async Task<List<FlightRate>> GetFlightRates(int flightId)
        {
            return await _context.FlightRates.Where(f => f.FlightId == flightId).ToListAsync();
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
