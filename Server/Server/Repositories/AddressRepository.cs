using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using Server.IRepositories;
using Server.Settings;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Repositories
{
    public class AddressRepository : IAddressRepository
    {
        private DataBaseContext _context;
        private bool disposed;

        public AddressRepository(DataBaseContext context)
        {
            _context = context;
            disposed = false;
        }


        public async Task<List<string>> GetAllAddresses()
        {
            var ret = _context.Addresses.GroupBy(a => a.City + ", " + a.Country).Select(s => s.Key);
            return  await ret.ToListAsync();
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
