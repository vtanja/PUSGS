using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models
{
    public class ChangePasswordModel
    {
        public string UserID { get; set; }
        public string Token { get; set; }
        public string NewPassword { get; set; }
    }
}
