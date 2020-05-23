using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models
{
    public class DiscountDate
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public int CarId { get; set; }
        public DateTime Date { get; set; }

        [ForeignKey("CarId")]
        public virtual Car Car { get; set; }

        public int Discount { get; set; }
        public int DiscountPrice { get; set; }
    }
}
