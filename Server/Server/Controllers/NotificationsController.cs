using System;
using System.Web;
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
        public IActionResult EmailConfirmed(string userId,string token)
        {
            ViewBag.userID =  userId;
            ViewBag.token =  token;
            return View("EmailConfirmed");
        }

        [HttpPost]
        [Route("[action]")]
        public void ChangeRoute(string userID,string token)
        {
            Response.Cookies.Append("userID",userID);
            Response.Cookies.Append("token",token);
            Response.Redirect("http://localhost:4200/change-password");
        }

        [HttpGet]
        [Route("[action]")]
        public IActionResult AlreadyConfirmed()
        {
            return View("ReservationAlreadyConfirmed");
        }

        [HttpGet]
        [Route("[action]")]
        public IActionResult InvitationConfirmed()
        {
            return View("InvitationConfirmed");
        }

        [HttpGet]
        [Route("[action]")]
        public IActionResult LateConfirm()
        {
            return View("LateConfirm");
        }

        [HttpGet]
        [Route("[action]")]
        public IActionResult ReservationAlreadyConfirmed()
        {
            return View("ReservationAlreadyConfirmed");
        }

        [HttpGet]
        [Route("[action]")]
        public IActionResult AlreadyDeclined()
        {
            return View("AlreadyDeclined");
        }

        [HttpGet]
        [Route("[action]")]
        public IActionResult InvitationDeclined()
        {
            return View("InvitationDeclined");
        }

    }
}