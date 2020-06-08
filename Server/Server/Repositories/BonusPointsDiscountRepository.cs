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
    public class BonusPointsDiscountRepository : IBonusPointsDiscountRepository
    {
        private DataBaseContext _context;
        private bool disposed;

        public BonusPointsDiscountRepository(DataBaseContext context)
        {
            _context = context;
            this.disposed = false;
        }

        public async Task<List<BonusPointsDiscount>> GetBonusPointsDiscount()
        {
           return await _context.BonusPointsDiscounts.ToListAsync();
        }

        public async Task Save()
        {
            await _context.SaveChangesAsync();
        }

        public void Update(BonusPointsDiscount bpDiscount)
        {
            _context.Entry<BonusPointsDiscount>(bpDiscount).State = EntityState.Modified;
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
