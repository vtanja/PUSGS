using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.TagHelpers;
using Microsoft.EntityFrameworkCore;
using Server.DTOs;
using Server.Models;
using Server.Settings;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlanesController : ControllerBase
    {
        private readonly DataBaseContext _context;
        private readonly IMapper _mapper;

        public PlanesController(DataBaseContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/Planes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Plane>>> GetPlanes()
        {
            var adminId = User.Claims.First(c => c.Type == "UserID").Value;
            var admin = await _context.AirlineAdmins.FindAsync(adminId);

            var planes = await _context.Planes.Include(x=>x.Segments).Where(x=>x.AirlineId==admin.AirlineId).ToListAsync();
            return planes;
        }

        // GET: api/Planes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Plane>> GetPlane(string id)
        {
            var plane = await _context.Planes.Include(x=>x.Segments).Where(x=>x.Code==id).FirstOrDefaultAsync();
            if (plane == null)
            {
                return NotFound();
            }

            return plane;
        }

        // PUT: api/Planes/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPlane(string id, Plane plane)
        {
            if (id != plane.Code)
            {
                return BadRequest();
            }

            _context.Entry(plane).State = EntityState.Detached;
            _context.Entry(plane).State = EntityState.Modified;

            try
            {
                foreach (var item in plane.Segments)
                {
                    _context.Entry(item).State = EntityState.Detached;
                    _context.Entry(item).State = EntityState.Modified;
                }

            }
            catch (Exception e)
            {
                foreach (var item in plane.Segments)
                {
                    _context.Entry(item).State = EntityState.Unchanged;
                }
                return BadRequest(new { message = "Updating data failed.Please try again later." });
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PlaneExists(id))
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

        // POST: api/Planes
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Plane>> PostPlane(Plane plane)
        {
            var adminId = User.Claims.First(c => c.Type == "UserID").Value;
            var admin = await _context.AirlineAdmins.FindAsync(adminId);

            
            plane.AirlineId = (int)admin.AirlineId;
            _context.Planes.Add(plane);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                var planeToDelete = await _context.Planes.FindAsync(plane.Code);
                _context.Planes.Remove(planeToDelete);
                return BadRequest(new { message = "Unable to add plane." });
                throw;
            }
        
            return CreatedAtAction("GetPlane", new { id = plane.Code }, _mapper.Map<PlaneDTO>(plane));
            

        }

        // DELETE: api/Planes/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Plane>> DeletePlane(string id)
        {
            var adminId = User.Claims.First(c => c.Type == "UserID").Value;
            var admin = await _context.AirlineAdmins.Include(x=>x.Airline).Where(x=>x.UserId == adminId).FirstOrDefaultAsync();

            var plane = await _context.Planes.Include(x=>x.Segments).Where(x=>x.Code==id).FirstOrDefaultAsync();
            if (plane == null)
            {
                return NotFound();
            }

            ////dodati proveru da li ima rezervisanih mesta
            //foreach (var item in plane.Segments)
            //{
            //    _context.Segments.Remove(item);
            //}

            //try
            //{
            //    await _context.SaveChangesAsync();
            //}
            //catch (Exception)
            //{

            //    return BadRequest(new { message = "Error while deleting plane's segment!" });
            //}

            //    var adminsPlane = admin.Airline.Planes.Where(y => y.Code == id).FirstOrDefault();
            //if (adminsPlane != null)
            //{
            //    admin.Airline.Planes.Remove(adminsPlane);
            //}

            _context.Planes.Remove(plane);
            await _context.SaveChangesAsync();

           var segments = await _context.Segments.Where(x => x.PlaneId == null).ToListAsync();

            foreach (var item in segments)
            {
              
                    _context.Segments.Remove(item);
                    try
                    {
                        await _context.SaveChangesAsync();
                    }
                    catch (Exception ex)
                    {

                        return BadRequest(new { message = "Error while deleting plane's segment!" });
                    }
                
            }
            return plane;
        }

        private bool PlaneExists(string id)
        {
            return _context.Planes.Any(e => e.Code == id);
        }
    }
}
