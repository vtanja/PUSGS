using System;
using System.Collections.Generic;
//using System.Data.Entity;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Server.DTOs;
using Server.HubConfig;
using Server.Models;
using Server.Services;
using Server.Settings;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FriendshipController : ControllerBase
    {
        private readonly DataBaseContext _dataBaseContext;
        private readonly IMapper _mapper;

        public FriendshipController(DataBaseContext dataBaseContext, IMapper mapper)
        {
            _dataBaseContext = dataBaseContext;
            _mapper = mapper;
        }

        [HttpPost]
        [Route("SendRequest")]
        //POST : /api/Friendship/SendRequest
        public async Task<ActionResult> SendRequest(LoginModel model)
        {
            //loggedUser
            string userId = User.Claims.First(c => c.Type == "UserID").Value;

            //logged user friends
            var friends = await _dataBaseContext.Friendships.Include(x => x.Friend).Where(x => x.UserID == userId).ToListAsync();

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
                try
                {
                    await _dataBaseContext.Friendships.AddAsync(f1);
                    await _dataBaseContext.SaveChangesAsync();

                    var toNotify = await _dataBaseContext.Friendships.Include(x => x.User).ThenInclude(x => x.RegisteredUser).Where(x => x.FriendID == toAdd.UserId && !x.Accepted).ToListAsync();
                    //List<UserDTO> retVal = new List<UserDTO>();
                    //toNotify.ForEach(r => retVal.Add(_mapper.Map<User, UserDTO>(r.User)));

                    //await _hubContext.Clients.Client(toAdd.UserId).SendAsync("getRequests", true);
                    return new JsonResult("success");
                }
                catch (Exception)
                {
                    return new JsonResult("error");
                }
            }

            else
            {
                return new JsonResult("Already sent request!");
            }  
            

            
        }

        [HttpGet]
        [Route("Requests")]
        public async Task<ActionResult<IEnumerable<UserDTO>>> GetRequests()
        {
            string userID = User.Claims.First(c => c.Type == "UserID").Value;
            //string userID = "738e3871-ea57-44e1-a29c-d6b64c737691";
            List<UserDTO> retVal = new List<UserDTO>();

            var users = await _dataBaseContext.Friendships.Include(x => x.User).ThenInclude(x=>x.RegisteredUser).Where(x => x.FriendID == userID && !x.Accepted).ToListAsync();


            users.ForEach(r => retVal.Add(_mapper.Map<User, UserDTO>(r.User)));
            return retVal;

        }

        [HttpGet]
        [Route("Friends")]
        public async Task<ActionResult<IEnumerable<UserDTO>>> GetFriends()
        {
            string userID = User.Claims.First(c => c.Type == "UserID").Value;
            //string userID = "03f8e568-bd54-4013-aad2-d8cb33743dd3";
            List<UserDTO> retVal = new List<UserDTO>();

            var users = await _dataBaseContext.Friendships.Include(x => x.Friend).ThenInclude(x => x.RegisteredUser).Where(x => x.UserID == userID && x.Accepted).ToListAsync();
            users.ForEach(r => retVal.Add(_mapper.Map<User, UserDTO>(r.Friend)));

            users = await _dataBaseContext.Friendships.Include(x => x.User).ThenInclude(x => x.RegisteredUser).Where(x => x.FriendID == userID && x.Accepted).ToListAsync();
            users.ForEach(r => retVal.Add(_mapper.Map<User, UserDTO>(r.User)));

            return retVal;

        }

        [HttpDelete("{username}")]
        public async Task<ActionResult<Friendship>> DeclineRequest(string username)
        {
            string userID = User.Claims.First(c => c.Type == "UserID").Value;
            //string userID = "738e3871-ea57-44e1-a29c-d6b64c737691";
            string friendID = _dataBaseContext.Users.Include(x => x.RegisteredUser).FirstOrDefault(u => u.RegisteredUser.UserName == username).UserId;

            Friendship friendship = await _dataBaseContext.Friendships.FirstOrDefaultAsync(x => x.FriendID == userID && x.UserID == friendID);

            if (friendship == null)
            {
                return NotFound();
            }

            _dataBaseContext.Friendships.Remove(friendship);
            await _dataBaseContext.SaveChangesAsync();

            return friendship;

        }

        [HttpPut("{username}")]
        public async Task<IActionResult> AcceptFriend(string username)
        {
            

            string userID = User.Claims.First(c => c.Type == "UserID").Value;
            //string userID = "03f8e568-bd54-4013-aad2-d8cb33743dd3";
            string friendID = _dataBaseContext.Users.Include(x => x.RegisteredUser).FirstOrDefault(u => u.RegisteredUser.UserName == username).UserId;

            Friendship friendship = await _dataBaseContext.Friendships.FirstOrDefaultAsync(x => x.FriendID == userID && x.UserID==friendID);

            if (friendship == null)
            {
                return NotFound();
            }
            else
            {
                friendship.Accepted = true;
                _dataBaseContext.Entry(friendship).State = EntityState.Modified;

                try
                {
                    await _dataBaseContext.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    throw;
                }
            }

            return NoContent();
        }
    }
}
