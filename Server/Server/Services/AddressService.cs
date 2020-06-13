using Server.IServices;
using Server.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Services
{
    public class AddressService : IAddressService
    {
        private AddressRepository addressRepository;

        public AddressService(AddressRepository addressRepository)
        {
            this.addressRepository = addressRepository;
        }

        public async Task<List<string>> GetAllAddresses()
        {
            return await addressRepository.GetAllAddresses();
        }
    }
}
