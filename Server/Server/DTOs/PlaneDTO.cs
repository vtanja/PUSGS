using Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.DTOs
{
    public class PlaneDTO
    {
        public string Code { get; set; }
        public int AirlineId { get; set; }
        public List<Segment> Segments{ get; set; }
    }
}
