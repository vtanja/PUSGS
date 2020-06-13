using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.IServices
{
    public interface IAddressService
    {
        Task<List<string>> GetAllAddresses();
    }
}
