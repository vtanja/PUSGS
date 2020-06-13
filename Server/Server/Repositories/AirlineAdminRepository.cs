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
    public class AirlineAdminRepository : IAirlineAdminRepository
    {
        private DataBaseContext _context;
        private bool disposed;

        public AirlineAdminRepository(DataBaseContext context)
        {
            _context = context;
            disposed = false;
        }

        public void AddAirlineAdmin(AirlineAdmin airlineAdmin)
        {
            _context.AirlineAdmins.Add(airlineAdmin);
        }

        public async Task<AirlineAdmin> GetAirlineAdmin(string id)
        {
            return await _context.AirlineAdmins.Include(x=>x.Airline).Where(x=>x.UserId==id).FirstOrDefaultAsync();
        }

        public async Task<List<AirlineAdmin>> GetAirlineAdmins()
        {
            return await _context.AirlineAdmins.Include(a => a.RegisteredUser).ToListAsync();
        }

        public void UpdateAirlineAdmin(AirlineAdmin airlineAdmin)
        {
            _context.Entry<AirlineAdmin>(airlineAdmin).State = EntityState.Modified;
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
