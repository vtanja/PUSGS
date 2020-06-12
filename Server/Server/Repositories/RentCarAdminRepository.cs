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
    public class RentCarAdminRepository : IRentCarAdminRepository
    {
        private DataBaseContext _context;
        private bool disposed;

        public RentCarAdminRepository(DataBaseContext context)
        {
            _context = context;
            disposed = false;
        }

        public void AddRentCarAdmin(RentCarAdmin rentCarAdmin)
        {
            _context.RentCarAdmins.Add(rentCarAdmin);
        }

        public void UpdateRentCarAdmin(RentCarAdmin rentCarAdmin)
        {
            _context.Entry<RentCarAdmin>(rentCarAdmin).State = EntityState.Modified;
        }

        public async Task<List<RentCarAdmin>> GetRentCarAdmins()
        {
            return await _context.RentCarAdmins.Include(a=>a.RegisteredUser).ToListAsync();
        }
        public async Task<RentCarAdmin> GetRentCarAdmin(string id)
        {
            return await _context.RentCarAdmins.FindAsync(id);
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
