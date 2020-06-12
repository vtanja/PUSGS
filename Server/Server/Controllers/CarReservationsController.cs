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
    public class CarReservationsController : ControllerBase
    {
        private readonly CarReservationService carReservationService;
        private readonly RentCarAdminService rentCarAdminService;
        private readonly IMapper _mapper;
        private readonly DataBaseContext _context;
        

        public CarReservationsController( UnitOfWork unitOfWork,IMapper mapper,DataBaseContext dataBaseContext)
        {
            _mapper = mapper;
            _context = dataBaseContext;
            carReservationService = unitOfWork.CarReservationService;
            rentCarAdminService = unitOfWork.RentCarAdminService;
        }

        // GET: api/CarReservations
        [HttpGet]
        [Authorize(Roles ="USER")]
        public async Task<List<CarReservationDTO>> GetCarReservations()
        {
            string userId = User.Claims.First(c => c.Type == "UserID").Value;
            var ret = _mapper.Map<List<CarReservationDTO>>(await carReservationService.GetUserCarReservations(userId));
            
            return ret;
        }

        //GET: api/CarReservations/Daily
        [HttpGet]
        [Route("Daily")]
        [Authorize(Roles = "RENTCARADMIN")]
        public async Task<ActionResult<CarReservation>> GetDailyCarReservation()
        {
            string userId = User.Claims.First(c => c.Type == "UserID").Value;
            var admin = await rentCarAdminService.GetRentCarAdmin(userId);

            if (admin.CompanyId == null)
                return BadRequest();

            var carReservation = await carReservationService.GetDailyReservationReport((int)admin.CompanyId);

            if (carReservation == null)
            {
                return NotFound();
            }

            return Ok(carReservation);
        }

        //GET: api/CarReservations/MonthlyIncomes
        [HttpGet]
        [Route("MonthlyIncomes/{date}")]
        [Authorize(Roles = "RENTCARADMIN")]
        public async Task<ActionResult<CarReservation>> GetMonthlyIncomes(string date)
        {
            string userId = User.Claims.First(c => c.Type == "UserID").Value;
            var admin = await rentCarAdminService.GetRentCarAdmin(userId);

            if (admin.CompanyId == null)
                return BadRequest();

            string[] parts = date.Split(':');
            if (parts.Count() == 0)
                return BadRequest();

            int month;
            int year;
            if(Int32.TryParse(parts[0],out month) && Int32.TryParse(parts[1],out year))
            {
                var carReservation = await carReservationService.GetMonthlyIncomes((int)admin.CompanyId,month,year);

                if (carReservation == null)
                {
                    return NotFound();
                }

                return Ok(carReservation);

            }

            return BadRequest();
        }

        //GET: api/CarReservations/AnnualIncomes
        [HttpGet]
        [Route("AnnualIncomes/{year}")]
        [Authorize(Roles = "RENTCARADMIN")]
        public async Task<ActionResult<CarReservation>> GetAnnualIncomes(int year)
        {
            string userId = User.Claims.First(c => c.Type == "UserID").Value;
            var admin = await rentCarAdminService.GetRentCarAdmin(userId);

            if (admin.CompanyId == null)
                return BadRequest();

            var carReservation = await carReservationService.GetAnnualIncomes((int)admin.CompanyId,year);

            if (carReservation == null)
            {
                return NotFound();
            }

            return Ok(carReservation);
        }

        [HttpGet]
        [Route("Weekly")]
        [Authorize(Roles = "RENTCARADMIN")]
        public async Task<ActionResult<CarReservation>> GetWeeklyReservation()
        {
            string userId = User.Claims.First(c => c.Type == "UserID").Value;
            var admin = await rentCarAdminService.GetRentCarAdmin(userId);

            if (admin.CompanyId == null)
                return BadRequest();

            var carReservation = await carReservationService.GetWeeklyReservationReport((int)admin.CompanyId);

            if (carReservation == null)
            {
                return NotFound();
            }

            return Ok(carReservation);
        }

        [HttpGet]
        [Route("Monthly")]
        [Authorize(Roles = "RENTCARADMIN")]
        public async Task<ActionResult<CarReservation>> GetMonthlyCarReservation()
        {
            string userId = User.Claims.First(c => c.Type == "UserID").Value;
            var admin = await rentCarAdminService.GetRentCarAdmin(userId); 

            if (admin.CompanyId == null)
                return BadRequest();

            var carReservation = await carReservationService.GetMonthlyReservationReport((int)admin.CompanyId);

            if (carReservation == null)
            {
                return NotFound();
            }

            return Ok(carReservation);
        }

        [HttpPost]
        [Authorize(Roles = "USER")]
        public async Task<ActionResult<CarReservation>> PostCarReservation(CarReservation carReservation)
        {
            string userId = User.Claims.First(c => c.Type == "UserID").Value;
            var user = await _context.RegisteredUsers.FindAsync(userId);

            if (user == null)
            {
                return BadRequest();
            }

            carReservation.UserId = userId;
            var ret = await carReservationService.AddQuickReservation(carReservation);

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

        [HttpPost]
        [Route("QuickReservation")]
        [Authorize(Roles = "USER")]
        public async Task<ActionResult<CarReservation>> PostQuickCarReservation(CarReservation carReservation)
        {
            string userId = User.Claims.First(c => c.Type == "UserID").Value;
            var user = await _context.RegisteredUsers.FindAsync(userId);

            if (user == null)
            {
                return BadRequest();
            }

            carReservation.UserId = userId;
            var ret = await carReservationService.AddQuickReservation(carReservation);

            if (ret == "success")
            {
                return Ok();
            }
            else if (ret == "error")
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
