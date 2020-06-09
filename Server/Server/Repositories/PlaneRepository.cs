using Microsoft.EntityFrameworkCore;
using Server.IRepositories;
using Server.IServices;
using Server.Models;
using Server.Settings;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Repositories
{
    public class PlaneRepository:IDisposable, IPlaneRepository
    {
        private DataBaseContext _context;
        private bool disposed;

        public PlaneRepository(DataBaseContext context)
        {
            _context = context;
            this.disposed = false;
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

        public async Task<IEnumerable<Plane>> GetPlanesByAirline(int airlineId)
        {
            return await _context.Planes.Include(x => x.Segments).Where(x => x.AirlineId == airlineId).ToListAsync();
        }

        public async Task<Plane> GetPlane(string id)
        {
            return await _context.Planes.Include(x => x.Segments).Include(x=>x.OccupiedDates).Where(x => x.Code == id).FirstOrDefaultAsync();
        }

        public void PostPlane(Plane plane)
        {
            foreach (var item in plane.Segments)
            {
                item.Id = 0;
            }

            _context.Planes.Add(plane);
        }

        public bool PlaneExists(string id)
        {
            return _context.Planes.Any(e => e.Code == id);
        }


        public void DeletePlane(Plane plane)
        {
            _context.Planes.Remove(plane);
        }

        public async Task<bool> UpdatePlane(Plane plane)
        {
            _context.Entry(plane).State = EntityState.Detached;
            _context.Entry(plane).State = EntityState.Modified;

            try
            {
                foreach (var item in plane.Segments)
                {
                    _context.Entry(item).State = EntityState.Detached;
                    _context.Entry(item).State = EntityState.Modified;
                }

            }
            catch (Exception e)
            {
                foreach (var item in plane.Segments)
                {
                    _context.Entry(item).State = EntityState.Unchanged;
                }
                // return BadRequest(new { message = "Updating data failed.Please try again later." });
                return false;
            }
            return true;
        }

    }
}
