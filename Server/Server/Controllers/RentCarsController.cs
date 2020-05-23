using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
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

        public RentCarsController(DataBaseContext context,IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
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

        // PUT: api/RentCars/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRentCar(int id, RentCar rentCar)
        {
            if (id != rentCar.Id)
            {
                return BadRequest();
            }

            _context.Entry(rentCar).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RentCarExists(id))
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

        // POST: api/RentCars
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<RentCar>> PostRentCar(RentCar rentCar)
        {
            _context.RentCars.Add(rentCar);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRentCar", new { id = rentCar.Id }, rentCar);
        }

        // DELETE: api/RentCars/5
        [HttpDelete("{id}")]
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
