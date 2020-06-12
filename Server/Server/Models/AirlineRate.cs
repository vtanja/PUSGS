using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models
{
    public class AirlineRate
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public int Rate { get; set; }

        public int AirlineId { get; set; }
        [ForeignKey("AirlineId")]
        public virtual Airline Airline { get; set; }
    }
}
