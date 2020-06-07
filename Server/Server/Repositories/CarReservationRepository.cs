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
    public class CarReservationRepository : ICarReservationRepository
    {
        private DataBaseContext _context;
        private bool disposed;

        public CarReservationRepository(DataBaseContext context)
        {
            _context = context;
            disposed = false;
        }

        public void AddCarReservation(CarReservation reservation)
        {
            _context.CarReservations.Add(reservation);
        }

        public async Task<IEnumerable<CarReservation>> GetUserCarReservation(string userId)
        {
            return await _context.CarReservations.Where(r => r.UserId == userId).ToListAsync();
        }

        public bool CarReservationExists(int id)
        {
            return _context.CarReservations.Any(e => e.Id == id);
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
