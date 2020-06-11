using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Models;
using Server.Services;
using Server.Settings;
using Server.UOW;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FlightRatesController : ControllerBase
    {
        private readonly DataBaseContext _context;
        private readonly FlightRateService flightRateService;

        public FlightRatesController(UnitOfWork unitOfWork)
        {
            flightRateService = unitOfWork.FlightRateService;
        }


        // POST: api/FlightRates
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        [Authorize(Roles = "USER")]
        public async Task<ActionResult<FlightRate>> PostFlightRate(RateModel flightRate)
        {
            if (await flightRateService.AddFlightRate(flightRate))
                return Ok();
            return BadRequest();
        }

    }
}
