using Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.IServices
{
    public interface IRentCarAdminService
    {
        Task<RentCarAdmin> GetRentCarAdmin(string id);
        Task<List<RentCarAdmin>> GetRentCarAdmins();
        Task<bool> AddRentCarAdmin(RentCarAdmin rentCarAdmin);
        Task<bool> UpdateRentCarAdmin(RentCarAdmin rentCarAdmin);
    }
}
