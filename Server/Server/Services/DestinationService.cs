using Server.IServices;
using Server.Models;
using Server.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;

namespace Server.Services
{
    public class DestinationService: IDestinationService
    {
        private DestinationRepository destinationRepository;

        public DestinationService(DestinationRepository destinationRepository)
        {
            this.destinationRepository = destinationRepository;
        }

        public async Task<bool> DeleteDestination(int id)
        {
            var dest = await destinationRepository.GetDestination(id);
            if(dest == null)
            {
                return false;
            }

             destinationRepository.DeleteDestination(dest);

            try
            {
                await destinationRepository.Save();
            }
            catch (Exception)
            {
                return false;
            }
            return true;

        }

        public async Task<Destination> GetDestination(int id)
        {
            var dest = await destinationRepository.GetDestination(id);
            if (dest == null)
            {
                return null;
            }
            return dest;
        }

        public async Task<IEnumerable<Destination>> GetDestinations(int airlineId)
        {
            return await destinationRepository.GetDestinations(airlineId);        
        }

        public async Task<bool> PostDestination(Destination destination)
        {
            if (destinationRepository.DestinationExists(destination.DestinationId))
            {
                return false;
            }

            destinationRepository.PostDestination(destination);
            try
            {
                await destinationRepository.Save();
            }
            catch (Exception)
            {
                return false;
            }
            return true;
        }
    }
}
