using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models
{
    public class Passenger
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public bool AcceptedInvitation { get; set; }
        public ICollection<Seat> Seats { get; set; }
        public string Passport { get; set; }
        public bool SendInvitation { get; set; }
        public bool AddedBonus { get; set; }
    }
}
