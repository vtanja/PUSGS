using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.DTOs;
using Server.Models;
using Server.Settings;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DestinationsController : ControllerBase
    {
        private readonly DataBaseContext _context;
        private readonly AutoMapper.IMapper _mapper;

        public DestinationsController(DataBaseContext context, AutoMapper.IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/Destinations
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DestinationDTO>>> GetDestinations()
        {
            string userId = User.Claims.First(c => c.Type == "UserID").Value;
            //string userId = "5f6c5a0c-aac8-45db-81d1-6c8b2ffda359";
            var user = await _context.AirlineAdmins.Include(x => x.Airline).Where(x => x.UserId == userId).FirstOrDefaultAsync();
            var dests = await _context.Destinations.Where(x => x.AirlineId == user.AirlineId).ToListAsync();
            List<DestinationDTO> retVal = new List<DestinationDTO>();
            dests.ForEach(x => retVal.Add(_mapper.Map<Destination, DestinationDTO>(x)));
            return retVal;
        }

        // GET: api/Destinations/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DestinationDTO>> GetDestination(int id)
        {
            var destination = await _context.Destinations.Include(x=>x.Airline).FirstOrDefaultAsync(x=>x.DestinationId==id);

            if (destination == null)
            {
                return NotFound();
            }

            return _mapper.Map<Destination,DestinationDTO>(destination);
        }

        // PUT: api/Destinations/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDestination(int id, Destination destination)
        {
            if (id != destination.DestinationId)
            {
                return BadRequest();
            }

            _context.Entry(destination).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DestinationExists(id))
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

        // POST: api/Destinations
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Destination>> PostDestination(Destination destination)
        {
            var adminId = User.Claims.First(c => c.Type == "UserID").Value;
            var admin = await _context.AirlineAdmins.Include(x=>x.Airline).ThenInclude(x=>x.Destinations).Where(x=>x.UserId==adminId).FirstOrDefaultAsync();

            if (admin.AirlineId != null)
            {
                if (admin.Airline.Destinations.Where(x => x.City == destination.City && x.Country == destination.Country).FirstOrDefault()==null)
                {
                    destination.AirlineId = (int)admin.AirlineId;

                    _context.Destinations.Add(destination);
                    try
                    {
                        await _context.SaveChangesAsync();

                    }
                    catch (Exception e)
                    {
                        return BadRequest(new { message = "Unable to add destination." });
                    }

                    return CreatedAtAction("GetDestination", new { id = destination.DestinationId }, _mapper.Map<DestinationDTO>(destination));
                }
                else
                {
                    return BadRequest(new { message = "This destination already exists!" });
                }
                    
            }

            return BadRequest(new { message = "Please add airline first!" });



            
            
        }

        // DELETE: api/Destinations/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Destination>> DeleteDestination(int id)
        {
            var destination = await _context.Destinations.FindAsync(id);
            if (destination == null)
            {
                return NotFound();
            }

            _context.Destinations.Remove(destination);
            await _context.SaveChangesAsync();

            return destination;
        }

        private bool DestinationExists(int id)
        {
            return _context.Destinations.Any(e => e.DestinationId == id);
        }
    }
}
