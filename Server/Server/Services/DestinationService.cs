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
        private FlightRepository flightRepository;

        public DestinationService(DestinationRepository destinationRepository, FlightRepository flightRepository)
        {
            this.destinationRepository = destinationRepository;
            this.flightRepository = flightRepository;
        }

        public async Task<bool> DeleteDestination(int id)
        {
            var dest = await destinationRepository.GetDestination(id);
            if(dest == null)
            {
                return false;
            }

            var flights = await flightRepository.GetAllFlights();
            foreach (var item in flights)
            {
                if(item.LandingLocation.Location.Contains(dest.City+", " + dest.Country))
                {
                    return false;
                }
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
