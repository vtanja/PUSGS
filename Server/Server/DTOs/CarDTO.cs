using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.DTOs
{
    public class CarDTO
    {

        public int Id { get; set; }

        public string Brand { get; set; }
        public string Model { get; set; }

        public int Year { get; set; }
        public int Rate { get; set; }
        public int Price { get; set; }
        public string Image { get; set; }

        public int PassengersNumber { get; set; }

        public bool HasAirCondition { get; set; }

        public bool HasAutomationGearbox { get; set; }

        public int Doors { get; set; }


    }
}
