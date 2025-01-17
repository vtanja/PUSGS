﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models
{
    public class FlightFlightReservation
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public int FlightId { get; set; }
        [ForeignKey("FlightId")]
        public virtual Flight Flight{ get; set; }
        public double FlightPrice { get; set; }
        public int ReservationId { get; set; }
        [ForeignKey("ReservationId")]
        public virtual FlightReservation Reservation { get; set; }
    }
}
