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
using Server.Repositories;
using Server.Services;
using Server.Settings;
using Server.UOW;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarsController : ControllerBase
    {

        private readonly IMapper _mapper;
        private readonly CarService carService;
        private readonly RentCarAdminService rentCarAdminService;

        public CarsController(DataBaseContext context,IMapper mapper,UnitOfWork 
            unitOfWork)
        {
            _mapper = mapper;
            carService = unitOfWork.CarService;
            rentCarAdminService = unitOfWork.RentCarAdminService;
        }

        // GET: api/Cars
        [HttpGet]
        public async Task<IEnumerable<Car>> GetCar()
        {
            // return await _context.Cars.ToListAsync();
            return await carService.GetCars();
        }

        // GET: api/Cars/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Car>> GetCar(int id)
        {
            //var car = await _context.Cars.FindAsync(id);
            var car = await carService.GetCarByID(id);

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
            var admin = await rentCarAdminService.GetRentCarAdmin(userId);

            if (admin == null || admin.CompanyId==null)
            {
                return BadRequest();
            }

            var ret = _mapper.Map<List<CarDTO>>(await carService.GetCompanyCars((int)admin.CompanyId));

            return ret;
        }

        // GET: api/Cars/Search
        [HttpGet("{pickUpLocation}/{dropOffLocation}/{pickUpDate}/{dropOffDate}/{passengers}/{brand}")]
        [Route("Search")]
        public async Task<ActionResult<IEnumerable<CarDTO>>> SearchCars([FromQuery] string pickUpLocation, [FromQuery] string dropOffLocation,
            [FromQuery] string pickUpDate, [FromQuery] string dropOffDate,[FromQuery] int passengers,[FromQuery] string brand)
        {
            SearchCarModel searchCarModel = new SearchCarModel()
            {
                DropOffDate = dropOffDate,
                PickUpDate = pickUpDate,
                DropOffLocation = dropOffLocation,
                PickUpLocation = pickUpLocation,
                Passengers = passengers,
                Brand = brand
            };

            return _mapper.Map<List<CarDTO>>(await carService.SearchCars(searchCarModel));
        }

        // GET: api/Cars/CompanyCarsSearch
        [HttpGet("{pickUpLocation}/{dropOffLocation}/{pickUpDate}/{dropOffDate}/{passengers}/{brand}/{companyID}")]
        [Route("CompanyCarsSearch")]
        public async Task<ActionResult<IEnumerable<CarDTO>>> SearchCompanyCars([FromQuery] string pickUpLocation, [FromQuery] string dropOffLocation,
            [FromQuery] string pickUpDate, [FromQuery] string dropOffDate, [FromQuery] int passengers, [FromQuery] string brand,[FromQuery] int companyID)
        {
            SearchCarModel searchCarModel = new SearchCarModel()
            {
                DropOffDate = dropOffDate,
                PickUpDate = pickUpDate,
                DropOffLocation = dropOffLocation,
                PickUpLocation = pickUpLocation,
                CompanyID = companyID,
                Passengers = passengers,
                Brand = brand
            };

            return  _mapper.Map<List<CarDTO>>(await carService.SearchCompanyCars(searchCarModel));
        }


        // PUT: api/Cars/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        [Authorize(Roles = "RENTCARADMIN")]
        public async Task<IActionResult> PutCar(int id, Car car)
        {

            if (await carService.UpdateCar(id,car))
            {
                return NoContent();
            }

            return BadRequest();
        }

        // POST: api/Cars
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        [Authorize(Roles = "RENTCARADMIN")]
        public async Task<ActionResult<Car>> PostCar(Car car)
        {
            var userId = User.Claims.First(c => c.Type == "UserID").Value;
            var user = await rentCarAdminService.GetRentCarAdmin(userId);

            if (user.CompanyId == null)
            {
                return BadRequest();
            }

            car.CompanyId = (int)user.CompanyId;
            if (await carService.AddCar(car))
                return Ok();

            return BadRequest();

        }

        // DELETE: api/Cars/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "RENTCARADMIN")]
        public async Task<ActionResult<Car>> DeleteCar(int id)
        {
            string result = await carService.DeleteCar(id);

            if (result == "success")
                return NoContent();
            else if (result == "failed")
                return BadRequest(new { message = "Unable to delete car. Car has active reservations." });
            else
                return BadRequest();

        }

    }
}
