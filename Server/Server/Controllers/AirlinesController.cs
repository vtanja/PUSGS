using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualStudio.Web.CodeGeneration.Contracts.Messaging;
using Server.DTOs;
using Server.Models;
using Server.Services;
using Server.Settings;
using Server.UOW;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AirlinesController : ControllerBase
    {
        private readonly DataBaseContext _context;
        private readonly IMapper _mapper;
        private readonly AirlineService _airlineService;

        public AirlinesController(DataBaseContext context, IMapper mapper, UnitOfWork
            unitOfWork)
        {
            _context = context;
            _mapper = mapper;
            _airlineService = unitOfWork.AirlineService;
        }

        // GET: api/Airlines
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Airline>>> GetAirlines()
        {
            return await _airlineService.GetAirlines();
        }

        // GET: api/Airlines/5
        [HttpGet]
        [Route("GetAirlineById/{id}")]
        public async Task<ActionResult<AirlineDTO>> GetAirlineById(int id)
        {
            var airline = await _airlineService.GetAirlineById(id);

            if (airline == null)
            {
                return NotFound();
            }

            var owner = airline.Owner;

            var mappedOwner = _mapper.Map<RegisteredUser, RegisteredUserDTO>(owner);

            var mapped = _mapper.Map<Airline, AirlineDTO>(airline);
            mapped.Owner = mappedOwner;
            return mapped;
        }


        [HttpGet]
        [Authorize(Roles="AIRLINEADMIN")]
        [Route("GetAirlineByUser/{username}")]
        public async Task<ActionResult<AirlineDTO>> GetAirlineByUser(string username)
        {
            var airline = await _airlineService.GetAirlineByUser(username);

            if (airline == null)
            {
                return NotFound();
            }

            return _mapper.Map<Airline, AirlineDTO>(airline);
        }

        // GET: api/Airlines/5
        [HttpGet]
        [Authorize(Roles = "AIRLINEADMIN")]
        [Route("HasUserAirline/{userId}")]
        public async Task<ActionResult<bool>> HasAirline(string userId)
        {
            return await _airlineService.HasAirline(userId);
        }



        // PUT: api/Airlines/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAirline(int id, Airline airline)
        {
            if (id != airline.Id)
            {
                return BadRequest(new { message = "An error ocured. Please try again later." });
            }

            //airline.OwnerId  = User.Claims.First(c => c.Type == "UserID").Value;
            try
            {
                _context.Entry<Airline>(airline).State = EntityState.Detached;
                _context.Entry<Airline>(airline).State = EntityState.Modified;
            }
            catch (Exception)
            {
                _context.Entry(airline).State = EntityState.Unchanged;
                return BadRequest(new { message = "Updating data failed. Please try again later." });
            }

            try
            {
                _context.Entry<Address>(airline.Address).State = EntityState.Detached;
                _context.Entry<Address>(airline.Address).State = EntityState.Modified;
            }
            catch (Exception)
            {
                _context.Entry<Address>(airline.Address).State = EntityState.Unchanged;
                return BadRequest(new { message = "Updating data failed. Please try again later." });
            }

            _context.Entry(airline).Property(a => a.Id).IsModified = false;
            _context.Entry(airline).Property(a => a.AddressId).IsModified = false;
            _context.Entry(airline).Property(a => a.OwnerId).IsModified = false;
            _context.Entry(airline).Property(a => a.Rate).IsModified = false;



            try
            {
                 await _context.SaveChangesAsync();
            }
            catch(Exception e)
            {
                if (!AirlineExists(id))
                {
                    return NotFound();
                }
                else
                {
                    return BadRequest(new { message = "Updating data failed. Please try again later." });
                }
            }


            return NoContent();
        }

        // POST: api/Airlines
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        [Authorize(Roles = "AIRLINEADMIN")]
        public async Task<ActionResult<Airline>> PostAirline(Airline airline)
        {
            string userID = User.Claims.First(c => c.Type == "UserID").Value;

            var user = await _context.AirlineAdmins.Include(x=>x.RegisteredUser).Where(x=>x.UserId==userID).FirstOrDefaultAsync();

            if (user.AirlineId == null)
            {
                user.Airline = airline;
                airline.Owner = user.RegisteredUser;

                if (await _airlineService.PostAirline(airline))
                {
                    return NoContent();
                }
                else
                {
                    return BadRequest("Error while adding airline!");
                }
            }
            else
            {
                return BadRequest("Airline already added!");
            }
            
        }

        private bool AirlineExists(int id)
        {
            return _context.Airlines.Any(e => e.Id == id);
        }

        // DELETE: api/Airlines/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Airline>> DeleteAirline(int id)
        {
            if (await _airlineService.DeleteAirline(id))
                return Ok();

            return BadRequest();
        }
    }
}
