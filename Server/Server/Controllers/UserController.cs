using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using Server.DTOs;
using Server.Models;
using Server.Settings;
using Server.Socials.Facebook;
using Server.Socials.Google;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private UserManager<RegisteredUser> _userManager;
        private SignInManager<RegisteredUser> _signInManager;
        private readonly ApplicationSettings _appSettings;
        private readonly Email.IEmailSender _emailSender;
        private readonly IMapper _mapper;
        private readonly DataBaseContext _dataBaseContext;

        public UserController(UserManager<RegisteredUser> userManager,
            SignInManager<RegisteredUser> signInManager, IOptions<ApplicationSettings> appSettings, Email.IEmailSender emailSender,
            DataBaseContext dataBaseContext,IMapper mapper)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _appSettings = appSettings.Value;
            _emailSender = emailSender;
            _dataBaseContext = dataBaseContext;
            _mapper = mapper;
        }


        [HttpGet]
        [Route("Profile")]
        public async Task<Object> GetUserProfile()
        {
            string userId = User.Claims.First(c => c.Type == "UserID").Value;

            var user = await _userManager.FindByIdAsync(userId);

            return new
            {
                user.FirstName,
                user.LastName,
                user.UserName,
                user.Email,
                user.Address,
                user.PhoneNumber
            };
        }

        [HttpPut("{username}")]
        public async Task<IActionResult> UpdateProfile(string username, UserModel model)
        {
            if (username != model.UserName)
            {
                return BadRequest();
            }

            var user = new RegisteredUser()
            {
                UserName = model.UserName,
                Email = model.Email,
                FirstName = model.FirstName,
                LastName = model.LastName,
                Address = model.Address,
                PhoneNumber = model.PhoneNumber
            };

            _dataBaseContext.Entry(user).State = EntityState.Modified;

            try
            {
                await _dataBaseContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (_dataBaseContext.RegisteredUsers.Where(x => x.UserName == username).FirstOrDefault() == null)
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

        [HttpGet("{username}")]
        public async Task<ActionResult<UserDTO>> GetUser(string username)
        {
            var user = await _dataBaseContext.Users.Include(x => x.RegisteredUser).Where(x => x.RegisteredUser.UserName == username).FirstOrDefaultAsync();

            if (user == null)
            {
                return NotFound();
            }

            return _mapper.Map<User, UserDTO>(user);
        }

        [HttpGet]
        [Route("AllUsers")]
        public async Task<ActionResult<IEnumerable<UserDTO>>> GetAllUsers()
        {
            string userName = User.Claims.First(c => c.Type == "UserName").Value;
            //string userName = "tanja";

            List<UserDTO> retVal = new List<UserDTO>();
            var users = await _dataBaseContext.Users.Include(user => user.RegisteredUser).Where(u => u.RegisteredUser.UserName != userName).ToListAsync();
            users.ForEach(r => retVal.Add(_mapper.Map<User, UserDTO>(r)));
            return retVal;

        }

        [HttpPost]
        [Route("Register")]
        //POST : /api/User/Register
        public async Task<Object> PostUser(UserModel model)
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
                    await _userManager.AddToRoleAsync(user, "USER");

                    await _dataBaseContext.Users.AddAsync(new User{ UserId = user.Id });
                    await _dataBaseContext.SaveChangesAsync();

                    var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                    var confirmationLink = Url.Action(nameof(ConfirmEmail), "User", new { UserId = user.Id, Code = token }, protocol: HttpContext.Request.Scheme);
                    await _emailSender.SendEmailAsync(user.Email, "Travellix - Confirmation email link", "Please confirm your email by clicking on this link: <a href=\"" + confirmationLink + "\">click here.</a>");

                    return Ok(result);
                }
                else
                {
                    return BadRequest(new { message = result.Errors.ToString()});
                }

                
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }


        [HttpPost]
        [Route("Login")]
        //POST : /api/User/Login
        public async Task<IActionResult> Login(LoginModel model)
        {
            var user = await _userManager.FindByNameAsync(model.UserName);
            if (user != null && await _userManager.CheckPasswordAsync(user, model.Password))
            {

                if (!await _userManager.IsEmailConfirmedAsync(user))
                {
                    return Unauthorized(new { message = "We sent you an email with confirmation link. Please confirm your registration with Travellix to log in. " });
                }

                //if (!user.PasswordChanged)
                //{
                //    return Unauthorized(new { message = "You haven't changed your password. Please check your email to get to change password page." });
                //}

                var role = await _userManager.GetRolesAsync(user);
                IdentityOptions _options = new IdentityOptions();
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                        new Claim("UserID",user.Id.ToString()),
                        new Claim("UserName",user.UserName),
                        new Claim(_options.ClaimsIdentity.RoleClaimType,role.FirstOrDefault())
                    }),
                    Expires = DateTime.UtcNow.AddDays(1),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_appSettings.JWT_Secret)), SecurityAlgorithms.HmacSha256Signature)
                };
                var tokenHandler = new JwtSecurityTokenHandler();
                var securityToken = tokenHandler.CreateToken(tokenDescriptor);
                var token = tokenHandler.WriteToken(securityToken);
                return Ok(new { token });
            }
            else
                return BadRequest(new { message = "Username or password is incorrect." });
        }

        [HttpPost]
        [Route("GoogleLogin")]
        // POST: api/<controller>/GoogleLogin
        public async Task<IActionResult> GoogleLogin([FromBody]LoginModel loginModel)
        {
            var googleApiTokenInfo = VerifyToken(loginModel.IdToken);

            if (googleApiTokenInfo!=null)
            {
                var user = await _dataBaseContext.RegisteredUsers.Where(u => u.Email == googleApiTokenInfo.email && u.SocialUserType == 'g').FirstAsync();

                if (user == null)
                {
                    var pass = "socialUser123";

                    var newUser = new RegisteredUser()
                    {
                        UserName = googleApiTokenInfo.email,
                        FirstName = googleApiTokenInfo.given_name,
                        LastName = googleApiTokenInfo.family_name,
                        Email = googleApiTokenInfo.email,
                        SocialUserType = 'g'
                    };
                    try
                    {
                        var result = await _userManager.CreateAsync(newUser, pass);

                        if (result.Succeeded)
                        {
                            await _userManager.AddToRoleAsync(newUser, "USER");
                            await _dataBaseContext.Users.AddAsync(new User { UserId = newUser.Id });
                            await _dataBaseContext.SaveChangesAsync();

                            var token = await GenerateToken(user);
                            return Ok(new { token });

                        }
                    }
                    catch (Exception ex)
                    {

                        return BadRequest(ex.Message);
                    }
                }
                else
                {

                    var token = await GenerateToken(user);
                    return Ok(new { token });
                }
            }

                return BadRequest(new { message = "Can not login.Information provided are not valid." });
        }

        [HttpPost]
        [Route("FacebookLogin")]
        // POST: api/<controller>/Login
        public async Task<IActionResult> FacebookLogin([FromBody]LoginModel loginModel)
        {

            var Client = new HttpClient();

            var appAccessTokenResponse = await Client.GetStringAsync($"https://graph.facebook.com/oauth/access_token?client_id={_appSettings.FacebookAppId}&client_secret={_appSettings.FacebookAppSecret}&grant_type=client_credentials");
            var appAccessToken = JsonConvert.DeserializeObject<FacebookAppAccessToken>(appAccessTokenResponse);
            // 2. validate the user access token
            var userAccessTokenValidationResponse = await Client.GetStringAsync($"https://graph.facebook.com/debug_token?input_token={loginModel.AuthToken}&access_token={appAccessToken.AccessToken}");
            var userAccessTokenValidation = JsonConvert.DeserializeObject<FacebookUserAccessTokenValidation>(userAccessTokenValidationResponse);

            if (userAccessTokenValidation.Data.IsValid)
            {
                var userInfoResponse = await Client.GetStringAsync($"https://graph.facebook.com/v2.8/me?fields=id,email,first_name,last_name,name,gender,locale,birthday,picture&access_token={loginModel.AuthToken}");
                var userInfo = JsonConvert.DeserializeObject<FacebookUserData>(userInfoResponse);

                bool exists = await _userManager.Users.Where (u => u.Email == userInfo.Email && u.SocialUserType=='f').AnyAsync();

                if (!exists)
                {
                    var pass = "socialUser123";

                    var newUser = new RegisteredUser()
                    {
                        UserName = userInfo.Email,
                        FirstName = userInfo.FirstName,
                        LastName = userInfo.LastName,
                        Email = userInfo.Email,
                        SocialUserType = 'f'
                    };

                    try
                    {
                        var result = await _userManager.CreateAsync(newUser, pass);


                        if (result.Succeeded)
                        {
                            await _userManager.AddToRoleAsync(newUser, "USER");
                            await _dataBaseContext.Users.AddAsync(new User { UserId = newUser.Id });
                            await _dataBaseContext.SaveChangesAsync();

                            var Token = await GenerateToken(newUser);
                            return Ok(new { Token });
                        }
                    }
                    catch (Exception ex)
                    {

                        return BadRequest(ex.Message);
                    }

                }
                else
                {
                    var user = await _userManager.Users.Where(u => u.Email == userInfo.Email && u.SocialUserType == 'f').FirstAsync();
                    var token = await GenerateToken(user);
                    return Ok(new { token });
                }

            }

            return Unauthorized("Can not login.Information provided are not valid.");
        }

        private const string GoogleApiTokenInfoUrl = "https://www.googleapis.com/oauth2/v3/tokeninfo?id_token={0}";

        public GoogleApiTokenInfo VerifyToken(string providerToken)
        {
            var httpClient = new HttpClient();
            var requestUri = new Uri(string.Format(GoogleApiTokenInfoUrl, providerToken));

            HttpResponseMessage httpResponseMessage;

            try
            {
                httpResponseMessage = httpClient.GetAsync(requestUri).Result;
            }
            catch
            {
                return null;
            }

            if (httpResponseMessage.StatusCode != HttpStatusCode.OK)
            {
                return null;
            }

            var response = httpResponseMessage.Content.ReadAsStringAsync().Result;
             return JsonConvert.DeserializeObject<GoogleApiTokenInfo>(response);

        }

        [HttpGet("[action]")]
        [AllowAnonymous]
        public async Task<IActionResult> ConfirmEmail(string userID, string code)
        {
            if(string.IsNullOrWhiteSpace(userID) || string.IsNullOrWhiteSpace(code))
            {
                ModelState.AddModelError("", "User ID and code are required");
                return BadRequest(ModelState);
            }

            var user = await _userManager.FindByIdAsync(userID);

            if (user == null)
            {
                return new JsonResult("ERROR");
            }

            if (user.EmailConfirmed && user.PasswordChanged )
            {
                return Redirect("http://localhost:4200/login");
            }

            var result = await _userManager.ConfirmEmailAsync(user, code);

            if (result.Succeeded)
            {
                var token = await _userManager.GeneratePasswordResetTokenAsync(user);
                return RedirectToAction("EmailConfirmed", "Notifications", new { userID, token });
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

        [HttpPost]
        [Route("ChangePassword")]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordModel changePasswordModel)
        {

            var user = await _userManager.FindByIdAsync(changePasswordModel.UserID);

            if (user == null)
            {
                return new JsonResult("ERROR");
            }

            if (user.PasswordChanged)
            {
                return BadRequest(new { message = "Password already changed." });
            }


            
            var result = await _userManager.ResetPasswordAsync(user, changePasswordModel.Token, changePasswordModel.NewPassword);

            if (result.Succeeded) { 
                
                _dataBaseContext.Entry<RegisteredUser>(user).State = EntityState.Modified;
                user.PasswordChanged = true;
                await _dataBaseContext.SaveChangesAsync();
                
                return Ok();
            }

            return BadRequest();
            
        }

        private async Task<string> GenerateToken(RegisteredUser user)
        {
            var role = await _userManager.GetRolesAsync(user);
            IdentityOptions _options = new IdentityOptions();

            var tokenDescriptor = new SecurityTokenDescriptor
            {

                Subject = new ClaimsIdentity(new Claim[]
               {
                        new Claim("UserID",user.Id),
                        new Claim("UserName",user.FirstName),
                        new Claim(_options.ClaimsIdentity.RoleClaimType,role.FirstOrDefault())
               }),
                Expires = DateTime.UtcNow.AddDays(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_appSettings.JWT_Secret)), SecurityAlgorithms.HmacSha256Signature)
            };
            var tokenHandler = new JwtSecurityTokenHandler();
            var securityToken = tokenHandler.CreateToken(tokenDescriptor);
            var token = tokenHandler.WriteToken(securityToken);
            return token;

        }
    }
}