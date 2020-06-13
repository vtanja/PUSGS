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
    public class ReservedDateRepository : IReservedDateRepository
    {
        private DataBaseContext _context;
        private bool disposed;

        public ReservedDateRepository(DataBaseContext context)
        {
            _context = context;
            disposed = false;
        }

        public void AddReservedDate(ReservedDate reservedDate)
        {
            _context.ReservedDates.Add(reservedDate);
        }

        public async Task<IEnumerable<ReservedDate>> GetCarReservedDates(int carID)
        {   
            return await _context.ReservedDates.Where(d => d.CarId == carID).ToListAsync();
        }

        public async Task<bool> IsCarReserved(int carID)
        {
            return await _context.ReservedDates.Where(d => d.CarId == carID && d.Date > DateTime.Today).AnyAsync();
        }

        public async Task<bool> AreDatesReserved(int carId, DateTime pickUpDate, DateTime dropOffDate)
        {
            return await _context.ReservedDates.Where(
                                  c => c.CarId == carId &&
                                  c.Date >= pickUpDate &&
                                  c.Date < dropOffDate
                                  ).AnyAsync();
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

        public async Task<bool> RemoveDate(DateTime date, int carId)
        {
            var reservedDate = await _context.ReservedDates.Where(x => x.CarId == carId && x.Date == date).FirstOrDefaultAsync();
            if (reservedDate != null)
            {
                _context.ReservedDates.Remove(reservedDate);
                return true;
            }
            return false;
        }
    }
}
