using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.DTOs;
using Server.Models;
using Server.Services;
using Server.Settings;
using Server.UOW;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarRatesController : ControllerBase
    {
        private readonly CarRateService carRateService;

        public CarRatesController(UnitOfWork unitOfWork)
        {
            carRateService = unitOfWork.CarRateService;
        }


        // POST: api/CarRates
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        [Authorize(Roles = "USER")]
        public async Task<ActionResult<CarRate>> PostCarRate(RateModel rateModel)
        {

            if (await carRateService.AddCarRate(rateModel))
                return Ok();
            return BadRequest();
        }


    }
}
