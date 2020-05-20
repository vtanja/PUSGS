using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models
{
    public class CarReservation
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public string UserId { get; set; }

        public DateTime PickuUpDate { get; set; }
        public DateTime DropOffDate { get; set; }
        public int Price { get; set; }

        [ForeignKey("UserId")]
        public virtual User User { get; set; }

        public int CarId { get; set; }
        [ForeignKey("CarId")]
        public virtual Car Car { get; set; }

        public int CarRateId { get; set; }

        [ForeignKey("CarRateId")]
        public CarRate CarRate { get; set; }

        public int CompanyRateId { get; set; }

        [ForeignKey("CompanyRateId")]
        public CompanyRate CompnayRate { get; set; }

    }
}
