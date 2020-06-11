using Server.IServices;
using Server.Models;
using Server.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Services
{
    public class RentCarAdminService : IRentCarAdminService
    {
        private RentCarAdminRepository rentCarAdminRepository;

        public RentCarAdminService(RentCarAdminRepository rentCarAdminRepository)
        {
            this.rentCarAdminRepository = rentCarAdminRepository;
        }

        public async Task<bool> AddRentCarAdmin(RentCarAdmin rentCarAdmin)
        {
            this.rentCarAdminRepository.AddRentCarAdmin(rentCarAdmin);
            try
            {
                await rentCarAdminRepository.Save();
            }
            catch
            {
                return false;
            }
            return true;
        }

        public async Task<bool> UpdateRentCarAdmin(RentCarAdmin rentCarAdmin)
        {
            this.rentCarAdminRepository.UpdateRentCarAdmin(rentCarAdmin);
            try
            {
                await rentCarAdminRepository.Save();
            }
            catch
            {
                return false;
            }
            return true;
        }

        public async Task<RentCarAdmin> GetRentCarAdmin(string id)
        {
            return await rentCarAdminRepository.GetRentCarAdmin(id); ;
        }

        public async Task<List<RentCarAdmin>> GetRentCarAdmins()
        {
            return await rentCarAdminRepository.GetRentCarAdmins();
        }
    }
}
