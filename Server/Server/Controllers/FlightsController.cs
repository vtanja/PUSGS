using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Razor.Language;
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
    public class FlightsController : ControllerBase
    {
        private readonly DataBaseContext _context;
        private readonly IMapper _mapper;
        private readonly FlightService flightService;

        public FlightsController(DataBaseContext context, IMapper mapper, UnitOfWork unitOfWork)
        {
            _context = context;
            _mapper = mapper;
            flightService = unitOfWork.FlightService;
        }

        // GET: api/Flights
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FlightDTO>>> GetFlights()
        {
            var userId = User.Claims.First(c => c.Type == "UserID").Value;
            var user = await _context.AirlineAdmins.Include(x=>x.Airline).ThenInclude(y=>y.Planes).Where(x=>x.UserId == userId).FirstOrDefaultAsync();

            var planes = user.Airline.Planes.ToList();
            var flights = await flightService.GetFlights(planes);

            var retVal = new List<FlightDTO>();
            foreach (var item in flights)
            {
                retVal.Add(_mapper.Map<Flight, FlightDTO>(item));
            }
            
            return retVal;
        }

        // GET: api/Flights/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Flight>> GetFlight(int id)
        {
            var flight = await flightService.GetFlight(id);

            if (flight == null)
            {
                return NotFound();
            }

            return flight;
        }


        // GET: api/Flights
        [HttpGet("{departureDate}/{returnDate}/{takeOffLocation}/{landingLocation}/{passengers}/{Class}")]
        [Route("SearchOneWayFlights")]
        public async Task<ActionResult<IEnumerable<FlightDTO>>> SearchOneWayFlights([FromQuery] string departureDate, [FromQuery] string returnDate,
            [FromQuery] string takeOffLocation, [FromQuery] string landingLocation, [FromQuery] int passengers, [FromQuery] string Class)
        {
            SearchFlightModel model = new SearchFlightModel()
            {
                DepartureDate = departureDate,
                ReturnDate = null,
                TakeOffLocation = takeOffLocation,
                LandingLocation = landingLocation,
                Passengers = passengers,
                Class = Class
            };

            var flights = await flightService.SearchFlights(model);

            var retVal = new List<FlightDTO>();

            foreach (var item in flights)
            {
                retVal.Add(_mapper.Map<Flight, FlightDTO>(item));
            }           

            return retVal;
        }

        [HttpGet("{departureDate}/{returnDate}/{takeOffLocation}/{landingLocation}/{passengers}/{Class}")]
        [Route("SearchMultiFlights")]
        public async Task<ActionResult<IEnumerable<FlightDTO>>> SearchMultiFlights([FromQuery] string departureDate, [FromQuery] string returnDate,
           [FromQuery] string takeOffLocation, [FromQuery] string landingLocation, [FromQuery] int passengers, [FromQuery] string Class)
        {
            SearchFlightModel model = new SearchFlightModel()
            {
                DepartureDate = departureDate,
                ReturnDate = null,
                TakeOffLocation = takeOffLocation,
                LandingLocation = landingLocation,
                Passengers = passengers,
                Class = Class
            };

            var flights = await flightService.SearchMultiFlights(model);

            var retVal = new List<FlightDTO>();

            foreach (var item in flights)
            {
                retVal.Add(_mapper.Map<Flight, FlightDTO>(item));
            }

            return retVal;
        }

        [HttpGet("{departureDate}/{returnDate}/{takeOffLocation}/{landingLocation}/{passengers}/{Class}")]
        [Route("SearchRoundFlights")]
        public async Task<ActionResult<IEnumerable<Tuple<FlightDTO,FlightDTO>>>> SearchRoundFlights([FromQuery] string departureDate, [FromQuery] string returnDate,
           [FromQuery] string takeOffLocation, [FromQuery] string landingLocation, [FromQuery] int passengers, [FromQuery] string Class)
        {
            SearchFlightModel model = new SearchFlightModel()
            {
                DepartureDate = departureDate,
                ReturnDate = returnDate,
                TakeOffLocation = takeOffLocation,
                LandingLocation = landingLocation,
                Passengers = passengers,
                Class = Class
            };

            var flights = await flightService.SearchRoundFlights(model);

            var retVal = new List<Tuple<FlightDTO,FlightDTO>>();

            foreach (var item in flights)
            {
                retVal.Add(new Tuple<FlightDTO,FlightDTO>(_mapper.Map<Flight, FlightDTO>(item.Item1), _mapper.Map<Flight, FlightDTO>(item.Item2)));
            }

            return retVal;
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

            var dates = new List<DateTime>();
            for (var dt = dateTime1; dt <= dateTime2; dt = dt.AddDays(1))
            {
                dates.Add(dt);
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

            var occupiedDates = await _context.OccupiedDates.Where(x => x.PlaneId == flight.PlaneId).ToListAsync();

            if (datesAreAvailable(dates, occupiedDates))
            {
                foreach (var item in dates)
                {
                    OccupiedDate od = new OccupiedDate();
                    od.Date = item;
                    od.PlaneId = flight.PlaneId;
                    _context.OccupiedDates.Add(od);
                    try
                    {
                        await _context.SaveChangesAsync();
                    }
                    catch (Exception)
                    {
                        _context.OccupiedDates.Remove(od);
                        return BadRequest(new { message = "Error while adding occupied dates!" });
                    }

                   
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
            else
            {
                return BadRequest(new { message = "Plane is not available on specified dates!" });
            }
            



            
        }

        private bool datesAreAvailable(List<DateTime> dates, List<OccupiedDate> occupiedDates)
        {
            if (occupiedDates.Count > 0)
            {
                foreach (var item in dates)
                {
                    var date = occupiedDates.FirstOrDefault(x => x.Date == item);
                    if ( date!=null)
                    {
                        return false;
                    }
                }

            }
            return true;
        }

        // DELETE: api/Flights/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Flight>> DeleteFlight(int id)
        {
            var flight = await flightService.GetFlight(id);
            if (flight == null)
            {
                return NotFound();
            }

            if(!await flightService.DeleteFlight(flight))
            {
                return BadRequest(new { message = "Error while deleting flight!" });
            }

            return flight;
        }

        
    }
}
