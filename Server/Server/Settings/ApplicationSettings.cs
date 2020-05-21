using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Settings
{
    public class ApplicationSettings
    {
        public string JWT_Secret { get; set; }
        public string Client_URL { get; set; }

        public string SendGridUser { get; set; }
        public string SendGridKey { get; set; }

        public string FacebookAppId { get; set; }
        public string FacebookAppSecret { get; set; }
    }
}
