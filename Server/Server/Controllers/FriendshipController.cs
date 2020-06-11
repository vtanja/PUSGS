using System;
using System.Collections.Generic;
//using System.Data.Entity;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Server.DTOs;
using Server.Models;
using Server.Services;
using Server.Settings;
using Server.UOW;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FriendshipController : ControllerBase
    {
        private readonly DataBaseContext _dataBaseContext;
        private readonly IMapper _mapper;
        private FriendshipService friendshipService;

        public FriendshipController(DataBaseContext dataBaseContext, IMapper mapper, UnitOfWork unitOfWork)
        {
            _dataBaseContext = dataBaseContext;
            _mapper = mapper;
            friendshipService = unitOfWork.FriendshipService;
        }

        [HttpPost]
        [Authorize(Roles = "USER")]
        [Route("SendRequest")]
        //POST : /api/Friendship/SendRequest
        public async Task<ActionResult> SendRequest(LoginModel model)
        {
            //loggedUser
            string userId = User.Claims.First(c => c.Type == "UserID").Value;

            //logged user friends
            var friends = friendshipService.GetUserFriends(userId);

            List <User> users = await _dataBaseContext.Users.Include(x => x.RegisteredUser).ToListAsync();
           List<Friendship> friendships = await _dataBaseContext.Friendships.ToListAsync();

            User loggedUser = users.Find(x => x.UserId == userId);
            User toAdd = users.Find(x => x.RegisteredUser.UserName == model.UserName);


            if (toAdd != null && friendships.Find(x => x.FriendID == toAdd.UserId && x.UserID == userId) == null && friendships.Find(x => x.FriendID == userId && x.UserID == toAdd.UserId)==null)
            {
                Friendship f1 = new Friendship()
                {
                    UserID = userId,
                    FriendID = toAdd.UserId,
                    Friend=toAdd,
                    User = loggedUser
                };
                
                if (await friendshipService.AddFriendship(f1))
                {
                    await _dataBaseContext.SaveChangesAsync();

                    var toNotify = await _dataBaseContext.Friendships.Include(x => x.User).ThenInclude(x => x.RegisteredUser).Where(x => x.FriendID == toAdd.UserId && !x.Accepted).ToListAsync();

                    return Ok(new { message = "Request sent successfully!" });
                }
                else
                {
                    return BadRequest(new { message = "Sending request failed. Please try again later." });
                }
            }

            else
            {
                return BadRequest(new { message = "You have already sent request" });
            }  
            

            
        }

        



        [HttpGet]
        [Authorize(Roles = "USER")]
        [Route("Requests")]
        public async Task<ActionResult<IEnumerable<UserDTO>>> GetRequests()
        {
            string userID = User.Claims.First(c => c.Type == "UserID").Value;
            List<UserDTO> retVal = new List<UserDTO>();

            var users = await friendshipService.GetRequests(userID);

            foreach (var item in users)
            {
                retVal.Add(_mapper.Map<User, UserDTO>(item.User));
            }
            return retVal;

        }

        [HttpGet]
        [Authorize(Roles = "USER")]
        [Route("Friends")]
        public async Task<IEnumerable<UserDTO>> GetFriends()
        {
            string userID = User.Claims.First(c => c.Type == "UserID").Value;
            List<UserDTO> retVal = new List<UserDTO>();

           var users = await friendshipService.GetFriends(userID);
            foreach (var item in users)
            {
                if (item.Friend == null && item.User!=null)
                {
                    retVal.Add(_mapper.Map<User, UserDTO>(item.User));
                }
                else if (item.User == null && item.Friend!=null)
                {
                    retVal.Add(_mapper.Map<User, UserDTO>(item.Friend));
                }
            }

            return retVal;

        }

        [HttpDelete("{username}")]
        [Authorize(Roles = "USER")]
        public async Task<ActionResult<Friendship>> DeclineRequest(string username)
        {
            string userID = User.Claims.First(c => c.Type == "UserID").Value;
            string friendID = _dataBaseContext.Users.Include(x => x.RegisteredUser).FirstOrDefault(u => u.RegisteredUser.UserName == username).UserId;

            if(await friendshipService.DeclineRequest(userID, friendID))
            {
                return NoContent();
            }
            else
            {
                return BadRequest(new { message = "Error while removing friendship!" });
            }

        }

        [HttpPut("{username}")]
        [Authorize(Roles = "USER")]
        public async Task<IActionResult> AcceptFriend(string username)
        {
            

            string userID = User.Claims.First(c => c.Type == "UserID").Value;
            string friendID = _dataBaseContext.Users.Include(x => x.RegisteredUser).FirstOrDefault(u => u.RegisteredUser.UserName == username).UserId;

            Friendship friendship = await friendshipService.FindFriendship(userID, friendID);

            if (friendship == null)
            {
                return NotFound();
            }
            else
            {
                if (await friendshipService.AcceptFriend(friendship))
                {
                    return NoContent();
                }
               else
                {
                    return BadRequest(new { message = "Accepting friend gone wrong. Please try again later." });
                }
            }

        }
    }
}
