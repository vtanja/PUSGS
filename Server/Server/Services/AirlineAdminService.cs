using Server.IServices;
using Server.Models;
using Server.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Services
{
    public class AirlineAdminService : IAirlineAdminService
    {
        private AirlineAdminRepository airlineAdminRepository;

        public AirlineAdminService(AirlineAdminRepository airlineAdminRepository)
        {
            this.airlineAdminRepository = airlineAdminRepository;
        }

        public async Task<bool> AddAirlineAdmin(AirlineAdmin airlineAdmin)
        {
            airlineAdminRepository.AddAirlineAdmin(airlineAdmin);
            try
            {
                await airlineAdminRepository.Save();
            }
            catch
            {
                return false;
            }
            return true;
        }

        public async Task<AirlineAdmin> GetAirlineAdmin(string id)
        {
            return await airlineAdminRepository.GetAirlineAdmin(id);
        }

        public async Task<List<AirlineAdmin>> GetAirlineAdmins()
        {
            return await airlineAdminRepository.GetAirlineAdmins();
        }

        public async Task<bool> UpdateAirlineAdmin(AirlineAdmin airlineAdmin)
        {
            airlineAdminRepository.UpdateAirlineAdmin(airlineAdmin);
            try
            {
                await airlineAdminRepository.Save();
            }
            catch
            {
                return false;
            }
            return true;
        }
    }
}
