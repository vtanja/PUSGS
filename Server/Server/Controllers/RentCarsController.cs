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
using Server.Settings;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RentCarsController : ControllerBase
    {
        private readonly DataBaseContext _context;
        private readonly IMapper _mapper;
        private readonly UserManager<RegisteredUser> _userManager;

        public RentCarsController(DataBaseContext context,IMapper mapper, UserManager<RegisteredUser> userManager)
        {
            _context = context;
            _mapper = mapper;
            _userManager = userManager;
        }

        // GET: api/RentCars
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RentCar>>> GetRentCars()
        {
            return await _context.RentCars.Include(rc => rc.Address).ToListAsync();
        }

        // GET: api/RentCars/5
        [HttpGet("{id}")]
        public async Task<ActionResult<RentCarDTO>> GetRentCar(int id)
        {
            var rentCar = await _context.RentCars.Include(rc => rc.Address).Include(rc => rc.Cars).Include(rc => rc.Offices).ThenInclude(o=>o.Address).FirstOrDefaultAsync(rc => rc.Id == id);
            var ret = _mapper.Map<RentCarDTO>(rentCar);
            if (rentCar == null)
            {
                return NotFound();
            }

            return ret;
        }

        // GET: api/RentCars/search
        [HttpGet("{name}/{address}/{rate}")]
        [Route("search")]
        public async Task<ActionResult<IEnumerable<RentCar>>> SearchRentCar([FromQuery]string name, [FromQuery]string address, [FromQuery]int rate)
        {
            List<RentCar> rentCars = new List<RentCar>();
            if (!String.IsNullOrEmpty(address))
            {
                string[] addressParts = address.Split(", ");
                var city = addressParts[0];
                var country = addressParts[1];

                if (!String.IsNullOrEmpty(name))
                    rentCars = await _context.RentCars.Where(rc => rc.Name.ToLower() == name.ToLower() && rc.Rate >= rate).Include(rc => rc.Address).Where(rc => rc.Address.City == city && rc.Address.Country == country).ToListAsync();
                else
                    rentCars = await _context.RentCars.Where(rc => rc.Rate >= rate).Include(rc => rc.Address).Where(rc => rc.Address.City == city && rc.Address.Country == country).ToListAsync();
            }
            else
            {
                if (!String.IsNullOrEmpty(name))
                    rentCars = await _context.RentCars.Where(rc => rc.Name.ToLower() == name.ToLower() && rc.Rate >= rate).Include(rc => rc.Address).ToListAsync();
                else
                    rentCars = await _context.RentCars.Where(rc => rc.Rate >= rate).ToListAsync();

            }
            
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
            var rentCar = await _context.RentCars.Include(rc => rc.Address).Where(c=>c.OwnerId == userId).FirstOrDefaultAsync();
           
            if (rentCar == null)
            {
                return NotFound();
            }

            var ret = _mapper.Map<RentCarDTO>(rentCar);
            return ret;
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
         

            try
            {
                _context.Entry<RentCar>(rentCar).State = EntityState.Detached;
                _context.Entry<RentCar>(rentCar).State = EntityState.Modified;

            }catch(Exception e)
            {
                _context.Entry<RentCar>(rentCar).State = EntityState.Unchanged;
                return BadRequest(new { message = "Updating data failed.Please try again later." });
            }

            try
            {
                _context.Entry<Address>(rentCar.Address).State = EntityState.Detached;
                _context.Entry<Address>(rentCar.Address).State = EntityState.Modified;

            }
            catch(Exception e)
            {
                _context.Entry<Address>(rentCar.Address).State = EntityState.Unchanged;
                return BadRequest(new { message = "Updating data failed.Please try again later." });
            }
            _context.Entry(rentCar).Property(rc => rc.Rate).IsModified = false;
            _context.Entry(rentCar).Property(rc => rc.OwnerId).IsModified = false;
            _context.Entry(rentCar).Property(rc => rc.AddressId).IsModified = false;
            
            

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException e)
            {
                if (!RentCarExists(id))
                {
                    return NotFound();
                }
                else
                {
                    return BadRequest(new { message = "Updating data failed.Please try again later." });
                }
            }

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

            _context.RentCars.Add(rentCar);

            await _context.SaveChangesAsync();

            user.CompanyId = rentCar.Id;

            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRentCar", new { id = rentCar.Id }, rentCar);
        }

        // DELETE: api/RentCars/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "RENTCARADMIN")]
        public async Task<ActionResult<RentCar>> DeleteRentCar(int id)
        {
            var rentCar = await _context.RentCars.FindAsync(id);
            if (rentCar == null)
            {
                return NotFound();
            }

            _context.RentCars.Remove(rentCar);
            await _context.SaveChangesAsync();

            return rentCar;
        }

        private bool RentCarExists(int id)
        {
            return _context.RentCars.Any(e => e.Id == id);
        }



    }
}
