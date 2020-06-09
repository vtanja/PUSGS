using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.TagHelpers;
using Microsoft.EntityFrameworkCore;
using Server.DTOs;
using Server.Models;
using Server.Services;
using Server.Settings;
using Server.UOW;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlanesController : ControllerBase
    {
        private readonly DataBaseContext _context;
        private readonly IMapper _mapper;
        private readonly PlaneService planeService;

        public PlanesController(DataBaseContext context, IMapper mapper, UnitOfWork unitOfWork)
        {
            _context = context;
            _mapper = mapper;
            planeService = unitOfWork.PlaneService;
        }

        // GET: api/Planes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PlaneDTO>>> GetPlanes()
        {
            var adminId = User.Claims.First(c => c.Type == "UserID").Value;
            var admin = await _context.AirlineAdmins.Include(x=>x.Airline).FirstOrDefaultAsync(x=>x.UserId == adminId);
            if (admin.Airline != null)
            {
                var planes = await planeService.GetPlanesByAirline((int)admin.AirlineId);
                List<PlaneDTO> retVal = new List<PlaneDTO>();
                foreach (var item in planes)
                {
                    retVal.Add(_mapper.Map<Plane, PlaneDTO>(item));
                }
                return retVal;
            }
            else{
                return BadRequest(new { message = "Admin haven't added airline yet!" });
            }
        }

        // GET: api/Planes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PlaneDTO>> GetPlane(string id)
        {
            var plane = await planeService.GetPlane(id);
            if (plane == null)
            {
                return NotFound();
            }

            return _mapper.Map<Plane, PlaneDTO>(plane);
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

            if(!await planeService.UpdatePlane(plane))
            {
                return BadRequest(new { message = "Updating data failed.Please try again later." });
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
            var admin = await _context.AirlineAdmins.Include(x => x.Airline).Where(x => x.UserId == adminId).FirstOrDefaultAsync();

            if (admin.Airline == null)
            {
                return BadRequest(new { message = "User haven't added airline yet!" });
            }

            
            plane.AirlineId = (int)admin.AirlineId;

            if(await planeService.PostPlane(plane))
            {
                return Ok();
            }
            else
            {
                return BadRequest(new { message = "Unable to add plane." });
            }

            

        }

        // DELETE: api/Planes/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Plane>> DeletePlane(string id)
        {
            var adminId = User.Claims.First(c => c.Type == "UserID").Value;
            var admin = await _context.AirlineAdmins.Include(x=>x.Airline).Where(x=>x.UserId == adminId).FirstOrDefaultAsync();

            var plane = await planeService.GetPlane(id);
            if (plane == null)
            {
                return NotFound();
            }

            
            if(await planeService.DeletePlane(plane))
            {
                return Ok();
            }
            else
            {
                return BadRequest(new { message = "Unable to delete plane!" });
            }

            if(!await planeService.DeletePlaneSegments())
            {
                return BadRequest(new { message = "Error while deleting plane's segment!" });
            }

            return plane;
        }

        
    }
}
