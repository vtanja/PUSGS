using Microsoft.AspNetCore.Mvc;
using Server.DTOs;
using Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.IRepositories
{
    interface IFriendshipRepository:IDisposable
    {
        Task<ActionResult> SendRequest(LoginModel model);
        Task<IEnumerable<Friendship>> GetRequests(string userID);
        Task<IEnumerable<Friendship>> GetFriends(string userID);
        Task<Friendship> DeclineRequest(Friendship f);
        Task<Friendship> AcceptFriend(Friendship f);
        Task Save();
        Task AddFriendship(Friendship f);
        Task<IEnumerable<Friendship>> GetUserFriends(string userId);
        Task<Friendship> FindFriendship(string userID, string friendId);
    }
}
