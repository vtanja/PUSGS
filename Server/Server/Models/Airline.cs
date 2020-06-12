using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models
{
    public class Airline
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [ForeignKey("OwnerId")]
        public string OwnerId { get; set; }

        public virtual RegisteredUser Owner { get; set; }
        public string Name { get; set; }

        [ForeignKey("AddressId")]
        public int AddressId { get; set; }

        public virtual Address Address { get; set; }

        public string Description { get; set; }

        public double Rate { get; set; }

        public string Logo { get; set; }

        public ICollection<Plane> Planes { get; set; }
        public ICollection<Destination> Destinations { get; set; } 
    }
}
