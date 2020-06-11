using Microsoft.AspNetCore.Mvc.RazorPages.Infrastructure;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Runtime;
using System.Threading.Tasks;

namespace Server.Models
{
    public class CarReservation
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string UserId { get; set; }
        public DateTime PickUpDate { get; set; }
        public DateTime DropOffDate { get; set; }
        public double PricePerDay { get; set; }
        public double TotalPrice { get; set; }
        [ForeignKey("UserId")]
        public virtual User User { get; set; }
        public int CarId { get; set; }
        [ForeignKey("CarId")]
        public virtual Car Car { get; set; }
        public int? CarRateId { get; set; }
        public int? CompanyRateId { get; set; }

        [ForeignKey("CarRateId")]
        public virtual CarRate CarRate { get; set; }
        [ForeignKey("CompanyRateId")]
        public virtual CompanyRate CompanyRate { get; set; }

        public bool Cancelled { get; set; }
        public DateTime DateCreated {get; set;}

    }
}
