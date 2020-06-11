using Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.DTOs
{
    public class RentCarDTO
    {

        public int Id { get; set; }

        public string Name { get; set; }

        public  Address Address { get; set; }

        public string Description { get; set; }

        public double Rate { get; set; }

        public string Logo { get; set; }

        public List<CarDTO> Cars { get; set; }

        public Dictionary<string,List<OfficeDTO>> Offices { get; set; }

    }
}
