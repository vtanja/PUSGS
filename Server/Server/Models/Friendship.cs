using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models
{
    public class Friendship
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int UserFriendID { get; set; }
        [ForeignKey("UserID"), Column(Order=1)]
        public string UserID { get; set; }
        [ForeignKey("FriendID"), Column(Order = 2)]
        public string FriendID { get; set; }
        public virtual User User { get; set; }
        public virtual User Friend { get; set; }
        public bool Accepted { get; set; }
    }
}
