using Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.IServices
{
    public interface IOfficeService 
    {
        Task<IEnumerable<Office>> GetOffices();
        Task<List<Office>> GetCompanyOffices(int companyId);
        Task<bool> AddOffice(Office office);
        Task<bool> DeleteOffice(int officeId);
    }
}
