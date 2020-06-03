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

            var ret =   _mapper.Map<List<CarDTO>>(await _context.Cars.Where(c => c.CompanyId == admin.CompanyId).ToListAsync());

            return ret;
        }

        // GET: api/Cars/Search
        [HttpGet("{pickUpLocation}/{dropOffLocation}/{pickUpDate}/{dropOffDate}/{passengers}/{brand}")]
        [Route("Search")]
        public async Task<ActionResult<IEnumerable<CarDTO>>> SearchCars([FromQuery] string pickUpLocation, [FromQuery] string dropOffLocation,
            [FromQuery] string pickUpDate, [FromQuery] string dropOffDate,[FromQuery] int passengers,[FromQuery] string brand)
        {

             
             string[] dropOffLocationParams = dropOffLocation.Split(", ");
             string[] pickUpLocationParams = pickUpLocation.Split(", ");
             string dropOffCity = dropOffLocationParams[0];
             string dropOffCountry = dropOffLocationParams[1];
             string pickUpCity = pickUpLocationParams[0];
             string pickUpCountry = pickUpLocationParams[1];
            DateTime dateDropOff = Convert.ToDateTime(dropOffDate);
            DateTime datepickUp = Convert.ToDateTime(pickUpDate);

            IEnumerable<int> carIDS;

            if(passengers>0 && !string.IsNullOrEmpty(brand))
            {
                carIDS = await _context.Cars.Where(c => c.PassengersNumber >= passengers && c.Brand.ToLower() == brand.ToLower()).Select(c=>c.Id).ToArrayAsync();
            }else if (passengers > 0 && string.IsNullOrEmpty(brand))
            {
                carIDS = await _context.Cars.Where(c => c.PassengersNumber >= passengers).Select(c => c.Id).ToArrayAsync();
            }
            else if (!string.IsNullOrEmpty(brand))
            {
                carIDS = await _context.Cars.Where(c=> c.Brand.ToLower() == brand.ToLower()).Select(c => c.Id).ToArrayAsync();
            }
            else
            {
                carIDS = await _context.Cars.Include(c=>c.CarCompany).Select(c => c.Id).ToArrayAsync();
            }

            if (carIDS.Count() == 0)
            {
                return NotFound();
            }

            var companiesPickUp = await _context.Offices.Include(o => o.Address)
                                        .Where(o => o.Address.City == pickUpCity && o.Address.Country == pickUpCountry)
                                        .Select(o => o.RentCarId)
                                        .ToArrayAsync();

            var companiesDropOff = await _context.Offices.Include(o => o.Address)
                                       .Where(o => o.Address.City == dropOffCity && o.Address.Country == dropOffCountry)
                                       .Select(o => o.RentCarId)
                                       .ToArrayAsync();

            var intersect = companiesPickUp.Intersect(companiesDropOff).Intersect(carIDS).ToArray();

            var reservedCars = await _context.ReservedDates.Where(d => d.Date <= dateDropOff && d.Date >= datepickUp).Select(c => c.CarId).ToArrayAsync();

            var ret = await _context.Cars.Where(c => intersect.Contains(c.CompanyId) && !reservedCars.Contains(c.Id)).ToListAsync();
   
            return _mapper.Map<List<CarDTO>>(ret);
        }



        // GET: api/Cars/CompanyCarsSearch
        [HttpGet("{pickUpLocation}/{dropOffLocation}/{pickUpDate}/{dropOffDate}/{passengers}/{brand}/{companyID}")]
        [Route("CompanyCarsSearch")]
        public async Task<ActionResult<IEnumerable<CarDTO>>> SearchCompanyCars([FromQuery] string pickUpLocation, [FromQuery] string dropOffLocation,
            [FromQuery] string pickUpDate, [FromQuery] string dropOffDate, [FromQuery] int passengers, [FromQuery] string brand,[FromQuery] int companyID)
        {
            string[] dropOffLocationParams = dropOffLocation.Split(", ");
            string[] pickUpLocationParams = pickUpLocation.Split(", ");
            string dropOffCity = dropOffLocationParams[0];
            string dropOffCountry = dropOffLocationParams[1];
            string pickUpCity = pickUpLocationParams[0];
            string pickUpCountry = pickUpLocationParams[1];
            DateTime dateDropOff = Convert.ToDateTime(dropOffDate);
            DateTime datepickUp = Convert.ToDateTime(pickUpDate);

            IEnumerable<int> carIDS;

            if (passengers > 0 && !string.IsNullOrEmpty(brand))
            {
                carIDS = await _context.Cars.Where(c => c.PassengersNumber >= passengers && c.Brand.ToLower() == brand.ToLower() && c.CompanyId==companyID).Select(c => c.Id).ToArrayAsync();
            }
            else if (passengers > 0 && string.IsNullOrEmpty(brand))
            {
                carIDS = await _context.Cars.Where(c => c.PassengersNumber >= passengers && c.CompanyId == companyID).Select(c => c.Id).ToArrayAsync();
            }
            else if (!string.IsNullOrEmpty(brand))
            {
                carIDS = await _context.Cars.Where(c => c.Brand.ToLower() == brand.ToLower() && c.CompanyId == companyID).Select(c => c.Id).ToArrayAsync();
            }
            else
            {
                carIDS = await _context.Cars.Where(rc=> rc.CompanyId == companyID).Select(c => c.Id).ToArrayAsync();
            }

            if (carIDS.Count() == 0)
            {
                return NotFound();
            }

            var companiesPickUp = await _context.Offices.Include(o => o.Address)
                                        .Where(o => o.Address.City == pickUpCity && o.Address.Country == pickUpCountry && o.RentCarId== companyID)
                                        .AnyAsync();

            var companiesDropOff = await _context.Offices.Include(o => o.Address)
                                       .Where(o => o.Address.City == dropOffCity && o.Address.Country == dropOffCountry && o.RentCarId == companyID)
                                       .Select(o => o.RentCarId)
                                       .AnyAsync();
            if (companiesDropOff && companiesPickUp)
            {
                var reservedCars = await _context.ReservedDates.Where(d => d.Date <= dateDropOff && d.Date >= datepickUp).Select(c => c.CarId).ToArrayAsync();

                var ret = await _context.Cars.Where(c => carIDS.Contains(c.CompanyId) && !reservedCars.Contains(c.Id)).ToListAsync();

                return _mapper.Map<List<CarDTO>>(ret);
            }

            return NotFound();
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

            try
            {
                _context.Entry<Car>(car).State = EntityState.Modified;

            }
            catch(Exception e)
            {

            }

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
