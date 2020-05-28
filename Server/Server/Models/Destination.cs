using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models
{
    public class Destination
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int DestinationId { get; set; }
        [Required]
        public string City { get; set; }
        [Required]
        public string Country { get; set; }
        [ForeignKey("AirlineId")]
        public int AirlineId { get; set; }
        public virtual Airline Airline { get; set; }
    }
}
