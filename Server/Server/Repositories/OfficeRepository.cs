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
    public class OfficeRepository : IDisposable, IOfficeRepository
    {
        private DataBaseContext _context;
        private bool disposed;

        public OfficeRepository(DataBaseContext context)
        {
            _context = context;
            this.disposed = false;
        }

        public void AddOffice(Office office)
        {
            _context.Offices.Add(office);
        }

        public bool DeleteOffice(int officeId)
        {
            if (OfficeExists(officeId))
            {
                var office = _context.Offices.Find(officeId);
                _context.Offices.Remove(office);
                return true;
            }
            return false;
        }

        public async Task<List<Office>> GetCompanyOffices(int companyId)
        {
            return await _context.Offices.Include(o => o.Address).Where(o => o.RentCarId == companyId).ToListAsync();
        }

        public async Task<IEnumerable<Office>> GetOffices()
        {
           return await _context.Offices.Include(o => o.Address).ToListAsync();
        }

        public bool OfficeExists(int id)
        {
            return _context.Offices.Any(e => e.Id == id);
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
