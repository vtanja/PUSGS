using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models
{
    public class Flight
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public string PlaneId { get; set; }

        [ForeignKey("PlaneId")]
        public virtual Plane Plane { get; set; }

        public Airport TakeOffLocation { get; set; }
        public Airport LandingLocation { get; set; }

        public string TakeOffDate { get; set; }
        public string LandingDate { get; set; }

        public string TakeOffTime{ get; set; }
        public string LandingTime { get; set; }

        public double Duration { get; set; }

        public ICollection<Airport> Connections { get; set; }
        public ICollection<SegmentPrice> SegmentPrices { get; set; }
        //public ICollection<FlightReservation> Reservations { get; set; }

        public ICollection<Seat> OccupiedSeats { get; set; }
    }
}
