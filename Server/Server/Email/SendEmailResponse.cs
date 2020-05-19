using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Email
{
    public class SendEmailResponse
    {
        public bool Successfull => ErrorMsg == null;
        public string ErrorMsg { get; set; }
    }
}
