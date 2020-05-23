﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models
{
    public class Car
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public string Brand { get; set; }
        public string Model { get; set; }
        
        public int Year { get; set; }
        public int Rate { get; set; }
        public int Price { get; set; }
        public string Image { get; set; }

        public int PassengersNumber { get; set; }

        public bool HasAirCondition { get; set; }

        public bool HasAutomationGearbox{ get; set; }

        public int Doors { get; set; }

        public int CompanyId { get; set; }

        [ForeignKey("CompanyId")]
        public virtual RentCar CarCompany { get; set; }
        public ICollection<CarReservation> Reservations{ get; set; }

        public ICollection<ReservedDate> ReservedDates { get; set; }
        public ICollection<DiscountDate> DisocuntDates { get; set; }
        public ICollection<CarRate> Rates { get; set; }


    }
}