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
    public class DestinationRepository:IDisposable, IDestinationRepository
    {
        private DataBaseContext _context;
        private bool disposed;

        public DestinationRepository(DataBaseContext context)
        {
            _context = context;
            this.disposed = false;
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

        public async Task<IEnumerable<Destination>> GetDestinations(int airlineId)
        {
           return await _context.Destinations.Where(x => x.AirlineId == airlineId).ToListAsync();
        }

        public async Task<Destination> GetDestination(int id)
        {
            return await _context.Destinations.Include(x => x.Airline).FirstOrDefaultAsync(x => x.DestinationId == id);
        }

        public bool DestinationExists(int id)
        {
            return _context.Destinations.Any(e => e.DestinationId == id);
        }

        public void PostDestination(Destination destination)
        {

            _context.Destinations.Add(destination);
        }

        Task<Destination> IDestinationRepository.PostDestination(Destination destination)
        {
            throw new NotImplementedException();
        }

        public void DeleteDestination(Destination destination)
        {
             _context.Destinations.Remove(destination);
        }
    }
}
