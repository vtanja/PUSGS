using Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.IRepositories
{
    public interface IAirlineAdminRepository :IDisposable
    {
        Task<AirlineAdmin> GetAirlineAdmin(string id);
        Task<List<AirlineAdmin>> GetAirlineAdmins();
        void AddAirlineAdmin(AirlineAdmin airlineAdmin);
        void UpdateAirlineAdmin(AirlineAdmin airlineAdmin);
        Task Save();
    }
}
