using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models
{
    public class DiscountRangeModel
    {
        public List<string> Dates{ get; set; }
      //  public DateTime EndDate { get; set; }

        public int CarId { get; set; }

        public double Discount { get; set; }
    }
}
