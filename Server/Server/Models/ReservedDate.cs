using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models
{
    public class ReservedDate
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Index("IX_CarAndDate", 1, IsUnique = true)]
        public int CarId { get; set; }

        [Index("IX_CarAndDate", 2, IsUnique = true)]
        public DateTime Date { get; set; }

        [ForeignKey("CarId")]
        public virtual Car Car { get; set; }
    }
}
