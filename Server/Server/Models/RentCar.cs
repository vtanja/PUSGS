using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models
{
    [Table("RentCar")]
    public class RentCar
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public string OwnerId { get; set; }

        [ForeignKey("OwnerId")]
        public virtual RegisteredUser Owner { get; set; }

        public string Name { get; set; }

        public int AddressId { get; set; }

        [ForeignKey("AddressId")]
        public virtual Address Address { get; set; }

        public string Description { get; set; }

        public int Rate  { get; set; }

        public string Logo { get; set; }

        public ICollection<Car> Cars { get; set; }
        public ICollection<Address> Offices { get; set; }
        public ICollection<CompanyRate> Rates { get; set; }
    }
}
