using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models
{
    public class CompanyRate
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public int Rate { get; set; }

        public int ReservationId { get; set; }

        [ForeignKey("ReservationId")]
        public virtual CarReservation CarReservation { get; set; }
    }
}
