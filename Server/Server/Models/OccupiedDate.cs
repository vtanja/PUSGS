using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models
{
    public class OccupiedDate
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public string PlaneId { get; set; }

        public DateTime Date { get; set; }

        [ForeignKey("PlaneId")]
        public virtual Plane Plane { get; set; }
    }
}
