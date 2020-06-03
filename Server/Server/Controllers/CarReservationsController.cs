using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Models;
using Server.Settings;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarReservationsController : ControllerBase
    {
        private readonly DataBaseContext _context;

        public CarReservationsController(DataBaseContext context)
        {
            _context = context;
        }

        // GET: api/CarReservations
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CarReservation>>> GetCarReservations()
        {
            return await _context.CarReservations.ToListAsync();
        }

        // GET: api/CarReservations/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CarReservation>> GetCarReservation(int id)
        {
            var carReservation = await _context.CarReservations.FindAsync(id);

            if (carReservation == null)
            {
                return NotFound();
            }

            return carReservation;
        }

        // PUT: api/CarReservations/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCarReservation(int id, CarReservation carReservation)
        {
            if (id != carReservation.Id)
            {
                return BadRequest();
            }

            _context.Entry(carReservation).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CarReservationExists(id))
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

        // POST: api/CarReservations
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        [Authorize(Roles = "USER")]
        public async Task<ActionResult<CarReservation>> PostCarReservation(CarReservation carReservation)
        {
            string userId = User.Claims.First(c => c.Type == "UserID").Value;
            var user = await _context.Users.FindAsync(userId);

            if (user == null)
            {
                return BadRequest();
            }

            if (!await IsPriceSame(carReservation))
                return BadRequest(new { message = "Car price has changed, please reload page to get changed values." });

            if (await AreDatesReserved(carReservation))
                return BadRequest(new { message = "Not all dates in this range are still available. Please reload page to get changed results." });

            carReservation.UserId = userId;
            _context.CarReservations.Add(carReservation);

            for(DateTime date = carReservation.PickUpDate; date <= carReservation.DropOffDate; date = date.AddDays(1))
            {
                var reservedDate = new ReservedDate()
                {
                    CarId = carReservation.CarId,
                    Date = date
                };

                _context.ReservedDates.Add(reservedDate);
            }

            await _context.SaveChangesAsync();

            return Ok();
        }

        // DELETE: api/CarReservations/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<CarReservation>> DeleteCarReservation(int id)
        {
            var carReservation = await _context.CarReservations.FindAsync(id);
            if (carReservation == null)
            {
                return NotFound();
            }

            _context.CarReservations.Remove(carReservation);
            await _context.SaveChangesAsync();

            return carReservation;
        }

        private bool CarReservationExists(int id)
        {
            return _context.CarReservations.Any(e => e.Id == id);
        }

        private async Task<bool> IsPriceSame(CarReservation carReservation)
        {
           double price = await _context.Cars.Where(c => c.Id == carReservation.CarId).Select(c => c.Price).FirstAsync();
            if (price==carReservation.PricePerDay)
                return true;
            return false;
        }

        private async Task<bool> AreDatesReserved(CarReservation carReservation)
        {
           return await  _context.ReservedDates.Where(
                                  c => c.CarId == carReservation.CarId &&
                                  c.Date >= carReservation.PickUpDate &&
                                  c.Date <= carReservation.DropOffDate
                                  ).AnyAsync();
        }
    }
}
