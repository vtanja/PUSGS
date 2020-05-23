using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models
{
    public class CarsSearchModel
    {
        public DateTime PickUpDate { get; set; }
        public DateTime DropOffDate { get; set; }
        
        public string PickUpLocation { get; set; }
        public string DropOffLocation { get; set; }
        public int Passengers { get; set; }
        public string Brand{ get; set; }
    }
}
