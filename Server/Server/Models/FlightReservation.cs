using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models
{
    public class FlightReservation
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ReservationId { get; set; }
        //public string UserId { get; set; }
        public double TotalPrice { get; set; }
       // [ForeignKey("UserId")]
        //public virtual User User { get; set; }
        public bool FlightRated { get; set; }
        public bool AirlineRated { get; set; }
        public bool Cancelled { get; set; }
        public int? CarReservationId { get; set; }
        [ForeignKey("CarReservationId")]
        public virtual CarReservation CarReservation { get; set; }
        public ICollection<Flight> Flights { get; set; } = new List<Flight>();
        public ICollection<Passenger> Passengers { get; set; }
        public ICollection<User> Users { get; set; }
        public DateTime DateCreated { get; set; }
    }
}
