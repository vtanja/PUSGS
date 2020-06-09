using Microsoft.AspNetCore.Mvc;
using Server.DTOs;
using Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.IServices
{
    public interface IFriendshipService
    {
        Task<ActionResult> SendRequest(LoginModel model);
        Task<IEnumerable<Friendship>> GetRequests(string userID);
        Task<IEnumerable<Friendship>> GetFriends(string userID);
        Task<bool> DeclineRequest(string userId, string friendID);
        Task<bool> AcceptFriend(Friendship f);
        Task<bool> AddFriendship(Friendship f);
        Task<IEnumerable<Friendship>> GetUserFriends(string userId);
        Task<Friendship> FindFriendship(string userID, string friendId);

    }
}
