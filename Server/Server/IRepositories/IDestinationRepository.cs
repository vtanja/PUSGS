using Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;

namespace Server.IRepositories
{
    public interface IDestinationRepository
    {
        Task Save();
        Task<IEnumerable<Destination>> GetDestinations(int airlineId);
        Task<Destination> GetDestination(int id);
        Task<Destination> PostDestination(Destination destination);
        bool DestinationExists(int id);
        void DeleteDestination(Destination destination);
    }
}
