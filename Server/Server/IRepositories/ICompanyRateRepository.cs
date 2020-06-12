using Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.IRepositories
{
    public interface ICompanyRateRepository : IDisposable
    {
        void AddCompanyRate(CompanyRate companyRate);
        Task<List<CompanyRate>> GetCompanyRates(int companyId);
        Task Save();
    }
}
