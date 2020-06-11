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
    public class RentCarRepository : IRentCarRepository, IDisposable
    {
        private DataBaseContext _context;
        private bool disposed;

        public RentCarRepository(DataBaseContext context)
        {
            disposed = false;
            _context = context;
        }

        public void AddRentCar(RentCar rentCar)
        {
            _context.RentCars.Add(rentCar);
        }

        public async Task DeleteRentCar(int rentCarId)
        {
            RentCar rentCar = await _context.RentCars.FindAsync(rentCarId);
            _context.RentCars.Remove(rentCar);
        }

        public async Task<RentCar> GetRentCar(int rentCarId)
        {
            return await _context.RentCars.FindAsync(rentCarId);
        }

        public async Task<RentCar> GetRentCarByID(int rentCarId)
        {
            try
            {
                var ret = await _context.RentCars.Include(rc => rc.Cars)
                                                 .Include(rc => rc.Address)
                                                .Include(rc => rc.Offices)
                                                .ThenInclude(o => o.Address)
                                                .FirstOrDefaultAsync(rc => rc.Id == rentCarId);
                 ret.Cars = ret.Cars.Where(c => !c.IsDeleted).ToList();
                return ret;
            }
            catch
            {
                return null;
            }

            
        }

        public async Task<RentCar> GetRentCarMainData(string ownerId)
        {
           return await _context.RentCars.Include(rc => rc.Address).Where(c => c.OwnerId == ownerId).FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<RentCar>> GetRentCars()
        {
            return await _context.RentCars.Include(rc => rc.Address).ToListAsync();
        }

        public bool RentCarExists(int id)
        {
            return _context.RentCars.Any(e => e.Id == id);
        }

        public async Task Save()
        {
             await _context.SaveChangesAsync();
        }

        public bool UpdateRentCar(RentCar rentCar)
        {
            try
            {
                _context.Entry<RentCar>(rentCar).State = EntityState.Detached;
                _context.Entry<RentCar>(rentCar).State = EntityState.Modified;

            }
            catch
            {
                _context.Entry<RentCar>(rentCar).State = EntityState.Unchanged;
                return false;
            }

            try
            {
                _context.Entry<Address>(rentCar.Address).State = EntityState.Detached;
                _context.Entry<Address>(rentCar.Address).State = EntityState.Modified;

            }
            catch
            {
                return false;
            }
            _context.Entry(rentCar).Property(rc => rc.Rate).IsModified = false;
            _context.Entry(rentCar).Property(rc => rc.OwnerId).IsModified = false;
            _context.Entry(rentCar).Property(rc => rc.AddressId).IsModified = false;
            return true;
        }

        public async Task<List<RentCar>> SearchRentCars(string name, string address, int rate)
        {
            List<RentCar> rentCars = new List<RentCar>();
            if (!String.IsNullOrEmpty(address))
            {
                string[] addressParts = address.Split(", ");
                var city = addressParts[0];
                var country = addressParts[1];

                if (!String.IsNullOrEmpty(name))
                    rentCars = await _context.RentCars.Where(rc => rc.Name.ToLower() == name.ToLower() && rc.Rate >= rate).Include(rc => rc.Address).Where(rc => rc.Address.City == city && rc.Address.Country == country).ToListAsync();
                else
                    rentCars = await _context.RentCars.Where(rc => rc.Rate >= rate).Include(rc => rc.Address).Where(rc => rc.Address.City == city && rc.Address.Country == country).ToListAsync();
            }
            else
            {
                if (!String.IsNullOrEmpty(name))
                    rentCars = await _context.RentCars.Where(rc => rc.Name.ToLower() == name.ToLower() && rc.Rate >= rate).Include(rc => rc.Address).ToListAsync();
                else
                    rentCars = await _context.RentCars.Where(rc => rc.Rate >= rate).ToListAsync();

            }
            return rentCars;
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
