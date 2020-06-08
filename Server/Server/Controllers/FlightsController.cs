using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Razor.Language;
using Microsoft.EntityFrameworkCore;
using Server.DTOs;
using Server.Models;
using Server.Settings;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FlightsController : ControllerBase
    {
        private readonly DataBaseContext _context;
        private readonly IMapper _mapper;

        public FlightsController(DataBaseContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/Flights
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FlightDTO>>> GetFlights()
        {
            var userId = User.Claims.First(c => c.Type == "UserID").Value;
            var user = await _context.AirlineAdmins.Include(x=>x.Airline).ThenInclude(y=>y.Planes).Where(x=>x.UserId == userId).FirstOrDefaultAsync();

            var planes = user.Airline.Planes;
            var flights = new List<Flight>();

            foreach (var item in planes)
            {
                flights.AddRange(_context.Flights.Where(x => x.PlaneId == item.Code).Include(x => x.Plane).ThenInclude(x => x.Airline).Include(x => x.TakeOffLocation).Include(x => x.LandingLocation).ToList());
            }

            var retVal = new List<FlightDTO>();
            flights.ForEach(x => retVal.Add( _mapper.Map<Flight, FlightDTO>(x)));
            
            return retVal;
        }

        // GET: api/Flights/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Flight>> GetFlight(int id)
        {
            var flight = await _context.Flights.FindAsync(id);

            if (flight == null)
            {
                return NotFound();
            }

            return flight;
        }

        // PUT: api/Flights/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFlight(int id, Flight flight)
        {
            if (id != flight.Id)
            {
                return BadRequest();
            }

            _context.Entry(flight).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FlightExists(id))
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

        // POST: api/Flights
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Flight>> PostFlight(Flight flight)
        {
            flight.Id = 0;

            DateTime dateTime1 = new DateTime(Convert.ToInt32(flight.TakeOffDate.Split('-')[2]), Convert.ToInt32(flight.TakeOffDate.Split('-')[1]), Convert.ToInt32(flight.TakeOffDate.Split('-')[0]));
            DateTime dateTime2 = new DateTime(Convert.ToInt32(flight.LandingDate.Split('-')[2]), Convert.ToInt32(flight.LandingDate.Split('-')[1]), Convert.ToInt32(flight.LandingDate.Split('-')[0]));

            dateTime1.AddHours(Convert.ToInt32(flight.TakeOffTime.Split(':')[0]));
            dateTime1.AddMinutes(Convert.ToInt32(flight.TakeOffTime.Split(':')[1]));

            dateTime2.AddHours(Convert.ToInt32(flight.LandingTime.Split(':')[0]));
            dateTime2.AddMinutes(Convert.ToInt32(flight.LandingTime.Split(':')[1]));

            if (dateTime2 < dateTime1)
            {
                return BadRequest(new {message="Invalid dates. Landing date and time must be after take off date and time!" });
            }

            List<SegmentPrice> segments = new List<SegmentPrice>();
            foreach (var item in flight.SegmentPrices)
            {
                segments.Add(item);
            }

            flight.SegmentPrices.Clear();
            foreach (var item in segments)
            {
                SegmentPrice sp = new SegmentPrice();
                sp.Price = item.Price;
                sp.SegmentID = item.Segment.Id;
                flight.SegmentPrices.Add(sp);
            }

            _context.Flights.Add(flight);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception e)
            {

                throw;
            }
            

            return CreatedAtAction("GetFlight", new { id = flight.Id }, flight);
        }

        // DELETE: api/Flights/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Flight>> DeleteFlight(int id)
        {
            var flight = await _context.Flights.FindAsync(id);
            if (flight == null)
            {
                return NotFound();
            }

            _context.Flights.Remove(flight);
            await _context.SaveChangesAsync();

            return flight;
        }

        private bool FlightExists(int id)
        {
            return _context.Flights.Any(e => e.Id == id);
        }
    }
}
