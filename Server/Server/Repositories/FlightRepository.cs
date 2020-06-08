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
    public class FlightRepository:IDisposable, IFlightRepository
    {
        private DataBaseContext _context;
        private bool disposed;

        public FlightRepository(DataBaseContext context)
        {
            _context = context;
            disposed = false;
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

        public async Task Save()
        {
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Flight>> GetFlights(List<Plane> planes)
        {
            var flights = new List<Flight>();
            foreach (var item in planes)
            {
                flights.AddRange(await _context.Flights.Where(x => x.PlaneId == item.Code).Include(x => x.Connections).Include(x => x.SegmentPrices).ThenInclude(x => x.Segment).Include(x => x.Plane).ThenInclude(x => x.Airline).Include(x => x.TakeOffLocation).Include(x => x.LandingLocation).ToListAsync());
            }
            return flights;
        }

        public async  Task<Flight> GetFlight(int id)
        {
            return await _context.Flights.FindAsync(id);
        }

        public void DeleteFlight(Flight flight)
        {
            _context.Flights.Remove(flight);
        }
    }
}
