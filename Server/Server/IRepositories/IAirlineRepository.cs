using Microsoft.AspNetCore.Mvc;
using Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.IRepositories
{
    public interface IAirlineRepository
    {
        Task<ActionResult<IEnumerable<Airline>>> GetAirlines();
        Task<Airline> GetAirlineById(int id);
        Task<Airline> GetAirlineByUser(string username);
        Task<bool> HasAirline(string userId);
        void PostAirline(Airline airline);
        Task Save();
        bool AirlineExists(int id);
        Task<bool> DeleteAirline(int id);
    }
}
