using Microsoft.AspNetCore.Mvc;
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
    public class AirlineRepository : IDisposable, IAirlineRepository
    {
        private DataBaseContext _context;
        private bool disposed;

        public AirlineRepository(DataBaseContext context)
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

        public async Task<ActionResult<IEnumerable<Airline>>> GetAirlines()
        {
            return await _context.Airlines.Include(rc => rc.Address).Include(x => x.Destinations).ToListAsync();
        }

        public async Task<Airline> GetAirlineById(int id)
        {
            return await _context.Airlines.Include(x => x.Address).Include(x => x.Destinations).Where(x => x.Id == id).FirstOrDefaultAsync();
        }

        public async Task<Airline> GetAirline(int id)
        {
            return await _context.Airlines.FindAsync(id);
        }

        public async Task<Airline> GetAirlineByUser(string username)
        {
            return await _context.Airlines.Include(x => x.Address).Include(x => x.Owner).Include(x => x.Destinations).Where(x => x.Owner.UserName == username).FirstOrDefaultAsync();
        }

        public async Task<bool> HasAirline(string userId)
        {
            var airline = await _context.Airlines.Where(x => x.OwnerId == userId).FirstOrDefaultAsync();
            if (airline == null)
            {
                return false;
            }

            return true;
        }

        public void UpdateAirline(Airline airline)
        {
            _context.Entry<Airline>(airline).State = EntityState.Modified;
        }

        public void PostAirline(Airline airline)
        {
            _context.Airlines.Add(airline);
        }

        public bool AirlineExists(int id)
        {
            return _context.Airlines.Any(e => e.Id == id);
        }

        public Task<bool> DeleteAirline(int id)
        {
            throw new NotImplementedException();
        }
    }
}
