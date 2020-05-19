using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Server.Controllers
{

    [Route("[controller]")]
    public class NotificationsController : Controller
    {


        [HttpGet]
        [Route("[action]")]
        public IActionResult EmailConfirmed(string userId,string code)
        {

            return View("EmailConfirmed");
        }
    }
}