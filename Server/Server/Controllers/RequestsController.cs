using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Server.HubConfig;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RequestsController : ControllerBase
    {
        private IHubContext<RequestsHub> _hub;

        public RequestsController(IHubContext<RequestsHub> hub)
        {
            _hub = hub;
        }

        public IActionResult Get()
        {
             _hub.Clients.All.SendAsync("transferchartdata", true);

            return Ok(new { Message = "Request Completed" });
        }
    }
}
