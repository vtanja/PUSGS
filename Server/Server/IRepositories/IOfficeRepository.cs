using Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.IRepositories
{
    public interface IOfficeRepository
    {
        Task<IEnumerable<Office>> GetOffices();
        Task<List<Office>> GetCompanyOffices(int companyId);
        void AddOffice(Office office);
        Task DeleteOffice(int officeId);
        Task Save();
        bool OfficeExists(int id);
    }
}
