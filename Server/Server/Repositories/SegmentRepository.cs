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
    public class SegmentRepository:IDisposable, ISegmentRepository
    {
        private DataBaseContext _context;
        private bool disposed;

        public SegmentRepository(DataBaseContext context)
        {
            _context = context;
            disposed = false;
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

        public bool SegmentExists(int id)
        {
            return _context.Segments.Any(e => e.Id == id);
        }


        public async Task<IEnumerable<Segment>> GetSegments()
        {
            return await _context.Segments.ToListAsync();
        }

        public async Task<Segment> GetSegment(int id)
        {
            return await _context.Segments.FindAsync(id);
        }

        public void PutSegment(Segment segment)
        {
            _context.Entry(segment).State = EntityState.Modified;
        }

        public void PostSegment(Segment segment)
        {
            _context.Segments.Add(segment);
        }

        public void DeleteSegment(Segment segment)
        {
            _context.Segments.Remove(segment);
        }

        public void DeletePlaneSegments()
        {
            var segments = _context.Segments.Where(x => x.PlaneId == null).ToList();

            foreach (var item in segments)
            {
                _context.Segments.Remove(item);
            }
        }
    }
}
