using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Newtonsoft.Json;
using Server.Models;
using Server.Repositories;
using Server.Services;
using Server.Settings;
using Server.UOW;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DiscountDatesController : ControllerBase
    {
        private readonly DataBaseContext _context;
        private readonly DiscountDateService discountDateService;

        public DiscountDatesController(DataBaseContext context,UnitOfWork unitOfWork)
        {
            _context = context;
            this.discountDateService = unitOfWork.DiscountDateService;
        }

        //// GET: api/DiscountDates
        //[HttpGet]
        //public async Task<ActionResult<IEnumerable<DiscountDate>>> GetDiscountDates()
        //{
        //    return await _context.DiscountDates.ToListAsync();
        //}

        // POST: api/DiscountDates
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        [Authorize(Roles ="RENTCARADMIN")]
        public async Task<ActionResult<DiscountDate>> PostDiscountDates(DiscountRangeModel discountRange)
        {
            var car = await _context.Cars.FindAsync(discountRange.CarId);
            if (car == null)
            {
                return BadRequest();
            }
            var ret = await discountDateService.AddDiscountDate(discountRange);
            if (ret == "success")
            {
                  return Ok(new { success = "Discount successfully aplied on all dates." });

            }
            else if (ret == "error")
            {
                return BadRequest();
            }
            else
            {
                return Ok(ret);
            }
        }

        [HttpPut]
        [Authorize(Roles = "RENTCARADMIN")]
        [Route("Override")]
        public async Task<ActionResult<DiscountDate>> OverrideDiscountDates(DiscountRangeModel discountRange)
        {
            var car = await _context.Cars.FindAsync(discountRange.CarId);
            if (car == null)
            {
                return BadRequest();
            }

            if (await discountDateService.UpdateDiscountDates(discountRange))
                return Ok();

            return BadRequest();
        }


        // DELETE: api/DiscountDates/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<DiscountDate>> DeleteDiscountDate(int id)
        {
            var discountDate = await _context.DiscountDates.FindAsync(id);
            if (discountDate == null)
            {
                return NotFound();
            }

            _context.DiscountDates.Remove(discountDate);
            await _context.SaveChangesAsync();

            return discountDate;
        }

    }
}
