using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models
{
    public class FlightReservationModel
    {
        public int ReservationId { get; set; }
        public double TotalPrice { get; set; }
        public bool FlightRated { get; set; }
        public bool AirlineRated { get; set; }
        public bool Cancelled { get; set; }
        public CarReservation CarReservation { get; set; } 
        public List<Passenger> Passengers { get; set; }
        public List<int> FlightsIds { get; set; }
    }
}
