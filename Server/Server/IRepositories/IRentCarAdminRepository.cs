using Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.IRepositories
{
    public interface IRentCarAdminRepository :IDisposable
    {
        Task<RentCarAdmin> GetRentCarAdmin(string id);
        void AddRentCarAdmin(RentCarAdmin rentCarAdmin);
        void UpdateRentCarAdmin(RentCarAdmin rentCarAdmin);
        Task Save();
    }
}
