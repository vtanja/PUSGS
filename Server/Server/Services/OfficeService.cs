using Server.IServices;
using Server.Models;
using Server.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Services
{
    public class OfficeService : IOfficeService
    {
        private OfficeRepository officeRepository;

        public OfficeService(OfficeRepository officeRepository)
        {
           this. officeRepository = officeRepository;
        }

        public async Task<bool> AddOffice(Office office)
        {
            officeRepository.AddOffice(office);
            try
            {
                await officeRepository.Save();
            }
            catch
            {
                return false;
            }
            return true;
        }

        public async Task<bool> DeleteOffice(int officeId)
        {
            await officeRepository.DeleteOffice(officeId);
            try
            {
                await officeRepository.Save();

            }
            catch
            {
                return false;
            }
            return true;
        }

        public async Task<List<Office>> GetCompanyOffices(int companyId)
        {
            return await officeRepository.GetCompanyOffices(companyId);
        }

        public async Task<IEnumerable<Office>> GetOffices()
        {
            return await officeRepository.GetOffices();
        }
    }
}
