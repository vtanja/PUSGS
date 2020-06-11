using Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.IServices
{
    public interface IAirlineAdminService
    {
        Task<AirlineAdmin> GetAirlineAdmin(string id);
        Task<List<AirlineAdmin>> GetAirlineAdmins();
        Task<bool> AddAirlineAdmin(AirlineAdmin airlineAdmin);
        Task<bool> UpdateAirlineAdmin(AirlineAdmin airlineAdmin);
    }
}
