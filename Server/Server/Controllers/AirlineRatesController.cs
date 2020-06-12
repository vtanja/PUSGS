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
    public class AirlineRatesController : ControllerBase
    {
        private readonly AirlineRateService airlineRateService;

        public AirlineRatesController(UnitOfWork unitOfWork)
        {
            airlineRateService = unitOfWork.AirlineRateService;
        }

        // POST: api/AirlineRates
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        [Authorize(Roles = "USER")]
        public async Task<ActionResult<AirlineRate>> PostAirlineRate(RateModel airlineRate)
        {
            if (await airlineRateService.AddAirlineRate(airlineRate))
                return Ok();
            return BadRequest();
        }

    }
}
