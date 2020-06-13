using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
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
    public class DestinationsController : ControllerBase
    {
        private readonly DataBaseContext _context;
        private readonly AutoMapper.IMapper _mapper;
        private readonly DestinationService destinationService;

        public DestinationsController(DataBaseContext context, AutoMapper.IMapper mapper, UnitOfWork unitOfWork)
        {
            _context = context;
            _mapper = mapper;
            destinationService = unitOfWork.DestinationService;
        }

        // GET: api/Destinations
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DestinationDTO>>> GetDestinations()
        {
            string userId = User.Claims.First(c => c.Type == "UserID").Value;
            var user = await _context.AirlineAdmins.Include(x => x.Airline).Where(x => x.UserId == userId).FirstOrDefaultAsync();
            if(user.Airline != null)
            {
                var dests = await destinationService.GetDestinations((int)user.AirlineId);
                List<DestinationDTO> retVal = new List<DestinationDTO>();
                foreach (var item in dests)
                {
                    retVal.Add(_mapper.Map<Destination, DestinationDTO>(item));
                }
                return retVal;
            }
            else
            {
                return BadRequest(new { message = "User haven't added airline yet!" });
            }
        }

        // GET: api/Destinations/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DestinationDTO>> GetDestination(int id)
        {
            var destination = await destinationService.GetDestination(id);

            if (destination == null)
            {
                return NotFound();
            }

            return _mapper.Map<Destination,DestinationDTO>(destination);
        }


        // POST: api/Destinations
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        [Authorize(Roles = "AIRLINEADMIN")]
        public async Task<ActionResult<Destination>> PostDestination(Destination destination)
        {
            var adminId = User.Claims.First(c => c.Type == "UserID").Value;
            var admin = await _context.AirlineAdmins.Include(x=>x.Airline).ThenInclude(x=>x.Destinations).Where(x=>x.UserId==adminId).FirstOrDefaultAsync();

            if (admin.AirlineId == null)
            {
                return BadRequest(new { message = "User haven't added airline yet!" });
            }

            if (admin.Airline.Destinations.Where(x => x.City == destination.City && x.Country == destination.Country).FirstOrDefault()==null)
            {
                destination.AirlineId = (int)admin.AirlineId;
                if (await destinationService.PostDestination(destination))
                {
                    return NoContent();
                }
                else
                {
                    return BadRequest(new { message = "Unable to add destination." });
                }
            }
            else
            {
                return BadRequest(new { message = "This destination already exists!" });
            }
                    
        }



        // DELETE: api/Destinations/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "AIRLINEADMIN")]
        public async Task<ActionResult<Destination>> DeleteDestination(int id)
        {
            if (await destinationService.DeleteDestination(id))
            {
                return NoContent();
            }

            return BadRequest(new { message = "Error while deleting destination! " });
        }

        
    }
}
