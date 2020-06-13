using Microsoft.AspNetCore.Mvc;
using Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.IServices
{
    public interface IAirlineService
    {
        Task<ActionResult<IEnumerable<Airline>>> GetAirlines();
        Task<Airline> GetAirlineById(int id);
        Task<Airline> GetAirlineByUser(string username);
        Task<bool> HasAirline(string userId);
        Task<bool> PostAirline(Airline airline);
        Task<bool> DeleteAirline(int id);
        Task<bool> UpdateAirline(Airline airline);
        Task<double> GetCompanyRate(int id);
    }
}
