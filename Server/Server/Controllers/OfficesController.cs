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
using Server.IServices;
using Server.Models;
using Server.Repositories;
using Server.Services;
using Server.Settings;
using Server.UOW;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OfficesController : ControllerBase
    {
        private readonly IMapper _mapper;
        private OfficeService officeService;
        private RentCarAdminService rentCarAdminService;

        public OfficesController(IMapper mapper,UnitOfWork unitOfWork)
        {
            _mapper = mapper;
            officeService = unitOfWork.OfficeService;
            rentCarAdminService = unitOfWork.RentCarAdminService;

        }

        // GET: api/Offices
        [HttpGet]
        [Authorize(Roles = "RENTCARADMIN")]
        public async Task<ActionResult<IDictionary<string,List<OfficeDTO>>>> GetOffices()
        {
            string userId = User.Claims.First(c => c.Type == "UserID").Value;
            var user = await rentCarAdminService.GetRentCarAdmin(userId);

            if (user.CompanyId == null)
                return BadRequest();

            List<OfficeDTO> offices = _mapper.Map<List<OfficeDTO>>(await officeService.GetCompanyOffices((int)user.CompanyId));

            var ret = offices.GroupBy(o=>o.Country).ToDictionary(g => g.Key, g => g.ToList());
            return  ret;
        }


        // POST: api/Offices
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        [Authorize(Roles = "RENTCARADMIN")]
        public async Task<ActionResult<OfficeDTO>> PostOffice(Office office)
        {
            var adminId = User.Claims.First(c => c.Type == "UserID").Value;
            var admin = await rentCarAdminService.GetRentCarAdmin(adminId);

            if (admin.CompanyId == null)
                return BadRequest();

            office.RentCarId = (int)admin.CompanyId;

            if(await officeService.AddOffice(office))
            {
                return Ok(_mapper.Map<OfficeDTO>(office));
            }
            return BadRequest();
        }

        // DELETE: api/Offices/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "RENTCARADMIN")]
        public async Task<ActionResult<Office>> DeleteOffice(int id)
        {
            if(await officeService.DeleteOffice(id))
                return NoContent();
            return BadRequest();
        }
    }
}
