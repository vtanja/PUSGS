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
    public class DiscountDateRepository : IDiscountDateRepository
    {
        private DataBaseContext _context;
        private bool disposed;

        public DiscountDateRepository(DataBaseContext context)
        {
            _context = context;
            disposed = false;
        }

        public async Task<DiscountDate> GetDiscountDate(DateTime date,int carId)
        {
            return await _context.DiscountDates.Where(d => d.Date == date && d.CarId==carId).FirstAsync();
        }
        public async Task<DiscountDate> GetDiscountDate( int id)
        {
            return await _context.DiscountDates.FindAsync(id);
        }
        public async Task<List<DiscountDate>> GetCarDiscountDatesObjects(int carId)
        {
            return await _context.DiscountDates.Where(d => d.CarId == carId).ToListAsync();
        }
        public void AddDiscountDate(DiscountDate discountDate)
        {
            _context.DiscountDates.Add(discountDate);
        }
        public void UpdateDiscountDate(DiscountDate discountDate)
        {
            _context.Entry<DiscountDate>(discountDate).State = EntityState.Modified;
        }
        public async Task<List<DateTime>> GetCarDiscountDates(int carId)
        {
           return await _context.DiscountDates.Where(d => d.CarId == carId).Select(d => d.Date).ToListAsync();
        }
        public void DeleteDiscountDate(DiscountDate discountDate)
        {
            _context.DiscountDates.Remove(discountDate);
        }
        public async Task<bool> ExistsDate(int id)
        { 
            var date = await _context.DiscountDates.FindAsync(id);
            if (date != null)
                return true;
            return false;
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
