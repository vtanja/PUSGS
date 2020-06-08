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
using Server.Services;
using Server.Settings;
using Server.UOW;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SegmentsController : ControllerBase
    {
        private readonly DataBaseContext _context;
        private readonly SegmentService segmentService;
        private readonly IMapper _mapper;

        public SegmentsController(DataBaseContext context, UnitOfWork unitOfWork, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
            segmentService = unitOfWork.SegmentService;
        }

        // GET: api/Segments
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SegmentDTO>>> GetSegments()
        {
            var segments = await segmentService.GetSegments();

            List<SegmentDTO> retVal = new List<SegmentDTO>();
            foreach (var item in segments)
            {
                retVal.Add(_mapper.Map<Segment, SegmentDTO>(item));
            }
            return retVal;
        }

        // GET: api/Segments/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SegmentDTO>> GetSegment(int id)
        {
            var segment = await segmentService.GetSegment(id);

            if (segment == null)
            {
                return NotFound();
            }

            return _mapper.Map<Segment, SegmentDTO>(segment);
        }

        // PUT: api/Segments/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSegment(int id, Segment segment)
        {
            if (id != segment.Id)
            {
                return BadRequest();
            }


            if (!await segmentService.PutSegment(segment))
            {
                return BadRequest(new { message = "Error while updating segment!" });
            }

            return NoContent();
        }

        // POST: api/Segments
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Segment>> PostSegment(Segment segment)
        {
            if (!await segmentService.PostSegment(segment))
            {
                return BadRequest(new { message = "Error while adding segment!" });
            }
            return NoContent();
        }

        // DELETE: api/Segments/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Segment>> DeleteSegment(int id)
        {
            var segment = await segmentService.GetSegment(id);
            if (segment == null)
            {
                return NotFound();
            }

            if(!await segmentService.DeleteSegment(segment))
            {
                return BadRequest(new { message = "Error while deleting segment!" });
            }

            return segment;
        }

        
    }
}
