using Microsoft.AspNetCore.Mvc;
using Server.IRepositories;
using Server.IServices;
using Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Services
{
    public class AirlineService:IAirlineService
    {
        private IAirlineRepository airlineRepository;

        public AirlineService(IAirlineRepository airlineRepository)
        {
            this.airlineRepository = airlineRepository;
        }

        public async Task<bool> DeleteAirline(int id)
        {
            if (!airlineRepository.AirlineExists(id))
                return false;
            await airlineRepository.DeleteAirline(id);
            try
            {
                await airlineRepository.Save();
            }
            catch
            {
                return false;
            }
            return true;
        }

        public async Task<Airline> GetAirlineById(int id)
        {
            return await airlineRepository.GetAirlineById(id);
        }

        public async Task<Airline> GetAirlineByUser(string username)
        {
            return await airlineRepository.GetAirlineByUser(username);
        }

        public async Task<ActionResult<IEnumerable<Airline>>> GetAirlines()
        {
            return await airlineRepository.GetAirlines();
        }

        public async Task<double> GetCompanyRate(int id)
        {
            var airline = await airlineRepository.GetAirlineById(id);
            return airline.Rate;
        }

        public async Task<bool> HasAirline(string userId)
        {
            return await airlineRepository.HasAirline(userId);
        }

        public async Task<bool> PostAirline(Airline airline)
        {
            airlineRepository.PostAirline(airline);
            try
            {
                await airlineRepository.Save();
            }
            catch
            {
                return false;
            }
            return true;
        }

        public async Task<bool> UpdateAirline(Airline airline)
        {
            if (airlineRepository.UpdateAirline(airline))
            {
                try
                {
                    await airlineRepository.Save();
                }
                catch
                {
                    return false;
                }
            }
            else
            {
                return false;
            }
            
            return true;
        }

    }
}
