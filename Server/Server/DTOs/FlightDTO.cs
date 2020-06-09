using Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.DTOs
{
    public class FlightDTO
    {
        public int Id { get; set; }

        public virtual Plane Plane { get; set; }

        public Airport TakeOffLocation { get; set; }
        public Airport LandingLocation { get; set; }

        public string TakeOffDate { get; set; }
        public string LandingDate { get; set; }

        public string TakeOffTime { get; set; }
        public string LandingTime { get; set; }

        public double Duration { get; set; }

        public List<Airport> Connections { get; set; }
        public List<SegmentPrice> SegmentPrices { get; set; }
    }
}
