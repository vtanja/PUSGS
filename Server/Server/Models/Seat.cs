using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models
{
    public class Seat
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Code { get; set; }
        public int FlightId { get; set; }
        [ForeignKey("FlightId")]
        public virtual Flight Flight { get; set; }
        public int PassengerId { get; set; }
        [ForeignKey("PassengerId")]
        public virtual Passenger Passenger { get; set; }
    }
}
