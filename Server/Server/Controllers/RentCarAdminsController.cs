﻿using System;
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
    public class RentCarAdminsController : ControllerBase
    {
        private UserManager<RegisteredUser> _userManager;
        private SignInManager<RegisteredUser> _signInManager;
        private readonly ApplicationSettings _appSettings;
        private readonly Email.IEmailSender _emailSender;
        private readonly DataBaseContext _context;
        private readonly IMapper _mapper;

        public RentCarAdminsController(UserManager<RegisteredUser> userManager,
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

        // GET: api/RentCarAdmins
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserDTO>>> GetRentCarAdmins()
        {
            var ret = (await _context.RentCarAdmins.Include(a=>a.RegisteredUser).ToListAsync());
            var ret2 = _mapper.Map<List<UserDTO>>(ret);
            return ret2;
        }

        // GET: api/RentCarAdmins/5
        [HttpGet("{id}")]
        public async Task<ActionResult<RentCarAdmin>> GetRentCarAdmin(string id)
        {
            var rentCarAdmin = await _context.RentCarAdmins.FindAsync(id);

            if (rentCarAdmin == null)
            {
                return NotFound();
            }

            return rentCarAdmin;
        }

        // PUT: api/RentCarAdmins/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRentCarAdmin(string id, RentCarAdmin rentCarAdmin)
        {
            if (id != rentCarAdmin.UserId)
            {
                return BadRequest();
            }

            _context.Entry(rentCarAdmin).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RentCarAdminExists(id))
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

        // POST: api/RentCarAdmins
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        [Route("AddAdmin")]
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
                    await _context.RentCarAdmins.AddAsync(new RentCarAdmin { UserId = user.Id });
                    await _context.SaveChangesAsync();


                    var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                    var confirmationLink = Url.Action(nameof(ConfirmEmail), "User", new { UserId = user.Id, Code = token }, protocol: HttpContext.Request.Scheme);
                    await _emailSender.SendEmailAsync(user.Email, "Travellix - Confirmation email link", "You have been registered as admin of rent car company.\nYour password is:" +model.Password+"\nPlease change your password after first log in.\nConfirm your email by clicking on this link: <a href=\"" + confirmationLink + "\">click here.</a>");

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

        // DELETE: api/RentCarAdmins/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<RentCarAdmin>> DeleteRentCarAdmin(string id)
        {
            var rentCarAdmin = await _context.RentCarAdmins.FindAsync(id);
            if (rentCarAdmin == null)
            {
                return NotFound();
            }

            _context.RentCarAdmins.Remove(rentCarAdmin);
            await _context.SaveChangesAsync();

            return rentCarAdmin;
        }

        private bool RentCarAdminExists(string id)
        {
            return _context.RentCarAdmins.Any(e => e.UserId == id);
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
