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
    public class OfficesController : ControllerBase
    {
        private readonly DataBaseContext _context;
        private readonly IMapper _mapper;

        public OfficesController(DataBaseContext context,IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/Offices
        [HttpGet]
        [Authorize(Roles = "RENTCARADMIN")]
        public async Task<ActionResult<IDictionary<string,List<OfficeDTO>>>> GetOffices()
        {
            string userId = User.Claims.First(c => c.Type == "UserID").Value;
            var user = await _context.RentCarAdmins.FindAsync(userId);
            List<OfficeDTO> offices = _mapper.Map<List<OfficeDTO>>(await _context.Offices.Include(o=>o.Address).Where(o=>o.RentCarId==user.CompanyId).ToListAsync());

            var ret = offices.GroupBy(o=>o.Country).ToDictionary(g => g.Key, g => g.ToList());
            return  ret;
        }

        // GET: api/Offices/5
        [HttpGet("{id}")]
        [Authorize(Roles = "RENTCARADMIN")]
        public async Task<ActionResult<Office>> GetOffice(int id)
        {
            var office = await _context.Offices.FindAsync(id);

            if (office == null)
            {
                return NotFound();
            }

            return office;
        }


        // PUT: api/Offices/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        [Authorize(Roles = "RENTCARADMIN")]
        public async Task<IActionResult> PutOffice(int id, Office office)
        {
            if (id != office.Id)
            {
                return BadRequest();
            }

            _context.Entry(office).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OfficeExists(id))
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

        // POST: api/Offices
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        [Authorize(Roles = "RENTCARADMIN")]
        public async Task<ActionResult<OfficeDTO>> PostOffice(Office office)
        {
            var adminId = User.Claims.First(c => c.Type == "UserID").Value;
            var admin = await _context.RentCarAdmins.FindAsync(adminId);

            _context.Addresses.Add(office.Address);
            try
            {
                await _context.SaveChangesAsync();
                
            }
            catch (Exception e)
            {
                return BadRequest(new { message = "Unable to add office." });
            }
            office.AddressId = office.Address.AddressId;
            office.RentCarId = (int)admin.CompanyId;
            _context.Offices.Add(office);
            try
            {
                await _context.SaveChangesAsync();
                
            }
            catch(Exception e)
            {
                var address = await _context.Addresses.FindAsync(office.AddressId);
                _context.Addresses.Remove(address);
                return BadRequest(new { message = "Unable to add office." });
            }

            return CreatedAtAction("GetOffice", new { id = office.Id }, _mapper.Map<OfficeDTO>(office));
        }

        // DELETE: api/Offices/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "RENTCARADMIN")]
        public async Task<ActionResult<Office>> DeleteOffice(int id)
        {
            var office = await _context.Offices.FindAsync(id);
            if (office == null)
            {
                return NotFound();
            }

            _context.Offices.Remove(office);
            await _context.SaveChangesAsync();

            return NoContent();
        }


        private bool OfficeExists(int id)
        {
            return _context.Offices.Any(e => e.Id == id);
        }
    }
}
