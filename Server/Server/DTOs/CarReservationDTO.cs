using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.DTOs
{
    public class CarReservationDTO
    {
        public int Id { get; set; }
        public string PickUpDate { get; set; }
        public string DropOffDate { get; set; }
        public string PickUpTime { get; set; }
        public string DropOffTime { get; set; }
        public string CarLogo { get; set; }
        public string CarBrand { get; set; }
        public string CarModel { get; set; }
        public string CompanyName { get; set; }
        public double CompanyRate { get; set; }
        public double CarRate { get; set; }
        public double Price { get; set; }
        public bool CanRate { get; set; }
    }
}
