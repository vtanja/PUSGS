using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Server.Models;
using Server.Settings;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DiscountDatesController : ControllerBase
    {
        private readonly DataBaseContext _context;

        public DiscountDatesController(DataBaseContext context)
        {
            _context = context;
        }

        // GET: api/DiscountDates
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DiscountDate>>> GetDiscountDates()
        {
            return await _context.DiscountDates.ToListAsync();
        }

        // GET: api/DiscountDates/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DiscountDate>> GetDiscountDate(int id)
        {
            var discountDate = await _context.DiscountDates.FindAsync(id);

            if (discountDate == null)
            {
                return NotFound();
            }

            return discountDate;
        }

        // PUT: api/DiscountDates/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDiscountDate(int id, DiscountDate discountDate)
        {
            if (id != discountDate.Id)
            {
                return BadRequest();
            }

            _context.Entry(discountDate).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DiscountDateExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

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

            var dates = new List<DiscountDate>();
            discountRange.Dates.ForEach(date => {
                dates.Add(new DiscountDate()
                {
                    Date = Convert.ToDateTime(date),
                    CarId = car.Id,
                    Discount = discountRange.Discount
                }
               ); });

            //var alreadyOnDiscount = new List<DateTime>();
            //var carsDiscountDates = await  _context.DiscountDates.Where(d => d.CarId == car.Id).Select(d=>d.Date).Intersect(dates).ToListAsync();

            ////for(DateTime date=discountRange.StartDate; date <=discountRange.EndDate; date = date.AddDays(1))
            ////{
            ////    if (carsDiscountDates.Contains(date))
            ////    {
            ////        alreadyOnDiscount.Add(date);
            ////    }
            ////    else
            ////    {
            ////        var discountDate = new DiscountDate()
            ////        {
            ////            CarId = car.Id,
            ////            Date = date,
            ////            Discount = discountRange.Discount

            ////        };
            ////        _context.DiscountDates.Add(discountDate);
            ////    }

            ////}

            //if (alreadyOnDiscount.Count == 0)
            //{
            //    try
            //    {
            //        await _context.SaveChangesAsync();
            //    }
            //    catch (Exception e)
            //    {

            //    }
            //    return Ok(new { message = "Discount successfully added for dates in range " });
            //}
            //else
            //{
            //    return Conflict(new { message = "Car is already on discount for those dates: " + alreadyOnDiscount.ToString() });
            //}
            return Ok();
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

        private bool DiscountDateExists(int id)
        {
            return _context.DiscountDates.Any(e => e.Id == id);
        }
    }
}
