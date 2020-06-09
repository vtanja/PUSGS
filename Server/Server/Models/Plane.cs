using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models
{
    public class Plane
    {
        [Key]
        public string Code { get; set; }
        public int AirlineId { get; set; }
        [ForeignKey("AirlineId")]
        public virtual Airline Airline { get; set; }
        public ICollection<Segment> Segments { get; set; }
        public ICollection<OccupiedDate> OccupiedDates{ get; set; }
    }
}
