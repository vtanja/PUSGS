using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Socials.Facebook
{
    public class FacebookAppAccessToken
    {
        
            [JsonProperty("token_type")]
            public string TokenType { get; set; }
            [JsonProperty("access_token")]
            public string AccessToken { get; set; }
    }
}
