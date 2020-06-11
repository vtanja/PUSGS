using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Server.DTOs;
using Server.Models;
using Server.Services;
using Server.Settings;
using Server.UOW;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RentCarAdminsController : ControllerBase
    {
        private UserManager<RegisteredUser> _userManager;
        private SignInManager<RegisteredUser> _signInManager;
        private readonly ApplicationSettings _appSettings;
        private readonly Email.IEmailSender _emailSender;
        private readonly IMapper _mapper;
        private readonly RentCarAdminService rentCarAdminService;

        public RentCarAdminsController(UserManager<RegisteredUser> userManager,
            SignInManager<RegisteredUser> signInManager, IOptions<ApplicationSettings> appSettings,
            Email.IEmailSender emailSender, IMapper mapper,UnitOfWork unitOfWork)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _appSettings = appSettings.Value;
            _emailSender = emailSender;
            _mapper = mapper;
            rentCarAdminService = unitOfWork.RentCarAdminService;
        }

        // GET: api/RentCarAdmins
        [HttpGet]
        [Authorize(Roles = "ADMINISTRATOR")]
        public async Task<ActionResult<IEnumerable<UserDTO>>> GetRentCarAdmins()
        {
            var ret = await rentCarAdminService.GetRentCarAdmins();
            var ret2 = _mapper.Map<List<UserDTO>>(ret);
            return ret2;
        }

        // GET: api/RentCarAdmins/5
        [HttpGet("{id}")]
        [Authorize(Roles = "ADMINISTRATOR")]
        public async Task<ActionResult<RentCarAdmin>> GetRentCarAdmin(string id)
        {
            var rentCarAdmin = await rentCarAdminService.GetRentCarAdmin(id);

            if (rentCarAdmin == null)
            {
                return NotFound();
            }

            return rentCarAdmin;
        }

        // POST: api/RentCarAdmins
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        [Route("AddAdmin")]
        [Authorize(Roles = "ADMINISTRATOR")]
        //POST : /api/RentCarAdmins/AddRentCarAdmin
        public async Task<Object> PostRentCarAdmin(UserModel model)
        {
            var user = new RegisteredUser()
            {
                UserName = model.UserName,
                Email = model.Email,
                FirstName = model.FirstName,
                LastName = model.LastName,
                Address = model.Address,
                PhoneNumber = model.PhoneNumber
            };

            try
            {
                var result = await _userManager.CreateAsync(user, model.Password);
                if (result.Succeeded)
                {
                    await _userManager.AddToRoleAsync(user, "RENTCARADMIN");
                    await rentCarAdminService.AddRentCarAdmin(new RentCarAdmin { UserId = user.Id });


                    var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                    var confirmationLink = Url.Action(nameof(ConfirmEmail), "User", new { UserId = user.Id, Code = token }, protocol: HttpContext.Request.Scheme);
                    await _emailSender.SendEmailAsync(user.Email, "Travellix - Confirmation email link", "You have been registered as admin of rent car company.\nYour password is:" + model.Password + "\nPlease change your password after first log in.\nConfirm your email by clicking on this link: <a href=\"" + confirmationLink + "\">click here.</a>");

                    return Ok(result);
                }
                else
                {
                    return BadRequest(new { message = "Username already exists." });
                }


            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("UserHasCompany")]
        [Authorize(Roles = "RENTCARADMIN, ADMINISTRATOR")]
        public async Task<ActionResult<IEnumerable<RentCar>>> UserHasCompany()
        {
            string userId = User.Claims.First(c => c.Type == "UserID").Value;
            RentCarAdmin user = await rentCarAdminService.GetRentCarAdmin(userId);
            if(user.CompanyId != null)
                return Ok(new { HasCompany = true });
            return Ok(new { HasCompany = false});
        }


        [HttpGet("[action]")]
        [AllowAnonymous]
        public async Task<IActionResult> ConfirmEmail(string userID, string code)
        {
            if (string.IsNullOrWhiteSpace(userID) || string.IsNullOrWhiteSpace(code))
            {
                ModelState.AddModelError("", "User ID and code are required");
                return BadRequest(ModelState);
            }

            var user = await _userManager.FindByIdAsync(userID);

            if (user == null)
            {
                return new JsonResult("ERROR");
            }

            if (user.EmailConfirmed)
            {
                return Redirect("/login");
            }

            var result = await _userManager.ConfirmEmailAsync(user, code);

            if (result.Succeeded)
            {
                return RedirectToAction("EmailConfirmed", "Notifications", new { userID, code });
            }
            else
            {
                List<string> errors = new List<string>();
                foreach (var error in result.Errors)
                {
                    errors.Add(error.ToString());
                }
                return new JsonResult(errors);
            }
        }
    }
}
