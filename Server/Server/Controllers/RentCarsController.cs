using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.DTOs;
using Server.Models;
using Server.Repositories;
using Server.Services;
using Server.Settings;
using Server.UOW;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RentCarsController : ControllerBase
    {
        private readonly DataBaseContext _context;
        private readonly IMapper _mapper;
        private readonly UserManager<RegisteredUser> _userManager;
        private RentCarService rentCarService;

        public RentCarsController(DataBaseContext context, IMapper mapper,
                                   UserManager<RegisteredUser> userManager,UnitOfWork unitOfWork)
        {
            _context = context;
            _mapper = mapper;
            _userManager = userManager;
            this.rentCarService= unitOfWork.RentCarService;
        }

        // GET: api/RentCars
        [HttpGet]
        public async Task<IEnumerable<RentCar>> GetRentCars()
        {
            return await rentCarService.GetRentCars();
        }

        // GET: api/RentCars/5
        [HttpGet("{id}")]
        public async Task<ActionResult<RentCarDTO>> GetRentCar(int id)
        {
            var rentCar = await rentCarService.GetRentCarByID(id);
            if (rentCar == null)
            {
                return NotFound();
            }

            return _mapper.Map<RentCarDTO>(rentCar);
        }

        // GET: api/RentCars/search
        [HttpGet("{name}/{address}/{rate}")]
        [Route("search")]
        public async Task<ActionResult<IEnumerable<RentCar>>> SearchRentCar([FromQuery]string name, [FromQuery]string address, [FromQuery]int rate)
        {
            List<RentCar> rentCars = await rentCarService.SearchRentCars(name,address,rate);
            
            if (rentCars == null)
            {
                return NotFound();
            }

            return rentCars;
        }

        // GET: api/RentCars
        [HttpGet]
        [Route("CompanyMainData")]
        [Authorize(Roles = "RENTCARADMIN")]
        public async Task<ActionResult<RentCarDTO>> GetRentCarMainData(int id)
        {
            string userId = User.Claims.First(c => c.Type == "UserID").Value;
            var rentCar = await rentCarService.GetRentCarMainData(userId);
            if (rentCar == null)
            {
                return NotFound();
            }

            return _mapper.Map<RentCarDTO>(rentCar);
        }

        // PUT: api/RentCars/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        [Authorize(Roles = "RENTCARADMIN")]
        public async Task<IActionResult> PutRentCar(int id, RentCar rentCar)
        {
            if (id != rentCar.Id)
            {
                return BadRequest(new  { message = "An error occured.Please try again later." });
            }
         
            if(!await rentCarService.UpdateRentCar(rentCar))
                return BadRequest(new { message = "Updating data failed.Please try again later." });

            return NoContent();
        }

        // POST: api/RentCars
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        [Authorize(Roles = "RENTCARADMIN")]
        public async Task<ActionResult<RentCar>> PostRentCar(RentCar rentCar)
        {
            string userId = User.Claims.First(c => c.Type == "UserID").Value;
            var user = await _context.RentCarAdmins.FindAsync(userId);
            rentCar.OwnerId = userId;

            if (await rentCarService.AddRentCar(rentCar))
            {
                user.CompanyId = rentCar.Id;

                await _context.SaveChangesAsync();

                return CreatedAtAction("GetRentCar", new { id = rentCar.Id }, rentCar);
            }

            return BadRequest();
        }

        // DELETE: api/RentCars/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "RENTCARADMIN")]
        public async Task<ActionResult<RentCar>> DeleteRentCar(int id)
        {
            if (await rentCarService.DeleteRentCar(id))
                return Ok();

            return BadRequest();
        }

    }
}
