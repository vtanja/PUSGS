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
using Server.Settings;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AirlineAdminsController : ControllerBase
    {
        private UserManager<RegisteredUser> _userManager;
        private SignInManager<RegisteredUser> _signInManager;
        private readonly ApplicationSettings _appSettings;
        private readonly Email.IEmailSender _emailSender;
        private readonly DataBaseContext _context;
        private readonly IMapper _mapper;

        public AirlineAdminsController(UserManager<RegisteredUser> userManager,
            SignInManager<RegisteredUser> signInManager, IOptions<ApplicationSettings> appSettings, 
            Email.IEmailSender emailSender, DataBaseContext dataBaseContext,IMapper mapper)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _appSettings = appSettings.Value;
            _emailSender = emailSender;
            _context = dataBaseContext;
            _mapper = mapper;
        }

        // GET: api/AirlineAdmins
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserDTO>>> GetAirlineAdmins()
        {
            return  _mapper.Map<List<UserDTO>>(await _context.AirlineAdmins.Include(a=>a.RegisteredUser).ToListAsync());
        }

        // GET: api/AirlineAdmins/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AirlineAdminDTO>> GetAirlineAdmin(string id)
        {
            var airlineAdmin = await _context.AirlineAdmins.FindAsync(id);

            if (airlineAdmin == null)
            {
                return NotFound();
            }

            return _mapper.Map<AirlineAdmin,AirlineAdminDTO>(airlineAdmin);
        }

        // PUT: api/AirlineAdmins/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAirlineAdmin(string id, AirlineAdmin airlineAdmin)
        {
            if (id != airlineAdmin.UserId)
            {
                return BadRequest();
            }

            _context.Entry(airlineAdmin).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AirlineAdminExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/AirlineAdmins
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<AirlineAdmin>> PostAirlineAdmin(AirlineAdmin airlineAdmin)
        {
            _context.AirlineAdmins.Add(airlineAdmin);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (AirlineAdminExists(airlineAdmin.UserId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetAirlineAdmin", new { id = airlineAdmin.UserId }, airlineAdmin);
        }

        [HttpPost]
        [Route("AddAdmin")]
        //POST : /api/AirlineAdmins/AddAdmin
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

                    await _userManager.AddToRoleAsync(user, "AIRLINEADMIN");
                    await _context.AirlineAdmins.AddAsync(new AirlineAdmin { UserId = user.Id });
                    await _context.SaveChangesAsync();


                    var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                    var confirmationLink = Url.Action(nameof(ConfirmEmail), "User", new { UserId = user.Id, Code = token }, protocol: HttpContext.Request.Scheme);
                    await _emailSender.SendEmailAsync(user.Email, "Travellix - Confirmation email link", "You have been registered as admin of airline company.\nYour password is:" + model.Password + "\nPlease change your password after first log in.\nPlease confirm your email by clicking on this link: <a href=\"" + confirmationLink + "\">click here.</a>");
                    return Ok(result);
                }
                else
                {
                    return BadRequest(new { message = "Username already exists."});
                }
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }

        // DELETE: api/AirlineAdmins/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<AirlineAdmin>> DeleteAirlineAdmin(string id)
        {
            var airlineAdmin = await _context.AirlineAdmins.FindAsync(id);
            if (airlineAdmin == null)
            {
                return NotFound();
            }

            _context.AirlineAdmins.Remove(airlineAdmin);
            await _context.SaveChangesAsync();

            return airlineAdmin;
        }

        private bool AirlineAdminExists(string id)
        {
            return _context.AirlineAdmins.Any(e => e.UserId == id);
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
