using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.DTOs;
using Server.Models;
using Server.Settings;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarsController : ControllerBase
    {
        private readonly DataBaseContext _context;
        private readonly IMapper _mapper;

        public CarsController(DataBaseContext context,IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/Cars
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Car>>> GetCar()
        {
            return await _context.Cars.ToListAsync();
        }

        // GET: api/Cars/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Car>> GetCar(int id)
        {
            var car = await _context.Cars.FindAsync(id);

            if (car == null)
            {
                return NotFound();
            }

            return car;
        }

        // GET: api/Cars/CompanyCars
        [HttpGet]
        [Route("CompanyCars")]
        public async Task<ActionResult<IEnumerable<CarDTO>>> GetCompanyCars()
        {
            var userId = User.Claims.First(c => c.Type == "UserID").Value;
            var admin = await _context.RentCarAdmins.FindAsync(userId);

            if (admin == null || admin.CompanyId==null)
            {
                return BadRequest();
            }

            return  _mapper.Map<List<CarDTO>>(await _context.Cars.Where(c => c.CompanyId == admin.CompanyId).ToListAsync());

        }

        // GET: api/Cars/Search
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<Car>>> SearchCars(CarsSearchModel searchModel)
        {
             string dropOffCity = searchModel.DropOffLocation;
             string dropOffCountry = searchModel.DropOffLocation;
             string pickUpCity = searchModel.PickUpLocation;
             string pickUpCountry = searchModel.PickUpLocation;


            var cars = await _context.Cars.Include(c => c.CarCompany).ThenInclude(c => c.Offices).ThenInclude(o => o.Address).Where(c => c.CarCompany.Offices.Any(o => o.Address.City == dropOffCity && o.Address.Country == dropOffCountry)).ToListAsync();
; 

            if (cars == null)
            {
                return NotFound();
            }

            return cars;
        }

        // PUT: api/Cars/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        [Authorize(Roles = "RENTCARADMIN")]
        public async Task<IActionResult> PutCar(int id, Car car)
        {
            if (id != car.Id)
            {
                return BadRequest();
            }

            _context.Entry(car).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CarExists(id))
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

        // POST: api/Cars
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        [Authorize(Roles = "RENTCARADMIN")]
        public async Task<ActionResult<Car>> PostCar(Car car)
        {
            var userId = User.Claims.First(c => c.Type == "UserID").Value;
            var user = await _context.RentCarAdmins.FindAsync(userId);

            if (user.CompanyId == null)
            {
                return BadRequest();
            }

            car.CompanyId = (int)user.CompanyId;

            _context.Cars.Add(car);
            try
            {
                await _context.SaveChangesAsync();
            }catch(Exception e)
            {
                return BadRequest();
            }

            return Ok();
        }

        // DELETE: api/Cars/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "RENTCARADMIN")]
        public async Task<ActionResult<Car>> DeleteCar(int id)
        {
            var car = await _context.Cars.FindAsync(id);
            if (car == null)
            {
                return NotFound();
            }

            if (this.CarCanBeDeleted(car.Id))
            {
                _context.Cars.Remove(car);
            }
            else
            {
                return BadRequest(new { message = "Unable to delete car. Car has active reservations." });
            }
            try
            {
                await _context.SaveChangesAsync();
            }
            catch
            {
                return BadRequest();
            }

            return NoContent();
        }

        [HttpPatch("{id}")]
        [Authorize(Roles = "RENTCARADMIN")]
        public async Task<ActionResult<CarDTO>> PatchCarPrice(int id,[FromBody] int price)
        {
            var car = await _context.Cars.FindAsync(id);

            if(car == null)
            {
                return NotFound();
            }

            car.Price = price;
            await _context.SaveChangesAsync();

            return _mapper.Map<CarDTO>(car);
        }

        private bool CarExists(int id)
        {
            return _context.Cars.Any(e => e.Id == id);
        }

        private bool CarCanBeDeleted(int id)
        {
            //ako postoje rezervacije, ne moze se brisati auto
            return true;
        }
    }
}
