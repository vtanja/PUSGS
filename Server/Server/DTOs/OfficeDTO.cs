using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.DTOs
{
    public class OfficeDTO
    {

        public int OfficeId { get; set; }

        public string Street { get; set; }

        public string Number { get; set; }

        public string City { get; set; }

        public string Country { get; set; }

        public double Longitude { get; set; }

        public double Latitude { get; set; }
    }
}
