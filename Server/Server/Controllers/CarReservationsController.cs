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
using Server.Repositories;
using Server.Services;
using Server.Settings;
using Server.UOW;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarReservationsController : ControllerBase
    {
        private readonly DataBaseContext _context;
        private readonly CarReservationService carReservationService;
        

        public CarReservationsController(DataBaseContext context,UnitOfWork unitOfWork)
        {
            _context = context;
            carReservationService = unitOfWork.CarReservationService;
        }

        // GET: api/CarReservations
        [HttpGet]
        [Authorize(Roles ="USER")]
        public async Task<IEnumerable<CarReservation>> GetCarReservations()
        {
            string userId = User.Claims.First(c => c.Type == "UserID").Value;
            return await carReservationService.GetUserCarReservations(userId);
        }

        // GET: api/CarReservations/5
        //[HttpGet("{id}")]
        //public async Task<ActionResult<CarReservation>> GetCarReservation(int id)
        //{
        //    var carReservation = await _context.CarReservations.FindAsync(id);

        //    if (carReservation == null)
        //    {
        //        return NotFound();
        //    }

        //    return carReservation;
        //}

        // PUT: api/CarReservations/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        //[HttpPut("{id}")]
        //public async Task<IActionResult> PutCarReservation(int id, CarReservation carReservation)
        //{
        //    if (id != carReservation.Id)
        //    {
        //        return BadRequest();
        //    }

        //    _context.Entry(carReservation).State = EntityState.Modified;

        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!CarReservationExists(id))
        //        {
        //            return NotFound();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return NoContent();
        //}

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

            carReservation.UserId = userId;
            var ret = await carReservationService.AddReservation(carReservation);

            if (ret == "success")
            {
                return Ok();
            }else if (ret == "error")
            {
                return BadRequest();
            }
            else
            {
                return BadRequest(new { message = ret });
            }
        }

    }
}
