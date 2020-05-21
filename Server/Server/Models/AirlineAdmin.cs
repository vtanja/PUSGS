using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models
{
    public class AirlineAdmin
    {
        [Key]
        public string UserId { get; set; }

        [ForeignKey("UserId")]
        public virtual RegisteredUser RegisteredUser { get; set; }
    }
}
