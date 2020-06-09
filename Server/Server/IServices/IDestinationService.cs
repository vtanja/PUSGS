using Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.IServices
{
    public interface IDestinationService
    {
        Task<IEnumerable<Destination>> GetDestinations(int airlineId);
        Task<Destination> GetDestination(int id);
        Task<bool> PostDestination(Destination destination);
        Task<bool> DeleteDestination(int id);
    }
}
