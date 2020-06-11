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
    public class CompanyRateRepository : ICompanyRateRepository
    {
        private DataBaseContext _context;
        private bool disposed;

        public CompanyRateRepository(DataBaseContext context)
        {
            _context = context;
            disposed = false;
        }

        public void AddCompanyRate(CompanyRate companyRate)
        {
            _context.CompanyRates.Add(companyRate);
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

        public async Task<List<CompanyRate>> GetCompanyRates(int companyId)
        {
            return await _context.CarReservations.Include(r=>r.Car).Include(r=>r.CompanyRate).Where(r => r.Car.CompanyId== companyId && r.CompanyRateId!=null).Select(x=>x.CompanyRate).ToListAsync();
        }
    }
}
