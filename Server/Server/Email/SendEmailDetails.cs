using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Email
{
    public class SendEmailDetails
    {
        public string FromMail { get; set; }
        public string ToMail { get; set; }

        public string FromName { get; set; }
        public string ToName { get; set; }
        public string Subject { get; set; }
        public string Content { get; set; }
        public bool IsHtml { get; set; }
    }
}
