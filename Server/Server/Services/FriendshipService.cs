using Microsoft.AspNetCore.Mvc;
using Server.DTOs;
using Server.IRepositories;
using Server.IServices;
using Server.Models;
using Server.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Services
{
    public class FriendshipService:IFriendshipService
    {
        FriendshipRepository _friendshipRepository;

        public FriendshipService(FriendshipRepository friendshipRepository)
        {
            _friendshipRepository = friendshipRepository;
        }

        public async Task<bool> AcceptFriend(Friendship f)
        {
            _friendshipRepository.AcceptFriend(f);
            try
            {
                await _friendshipRepository.Save();

            }
            catch (Exception)
            {
                return false;
            }
            return true;
        }

        public async Task<bool> DeclineRequest(string userId, string friendID)
        {
            Friendship friendship = await _friendshipRepository.FindFriendship(userId, friendID);

            if (friendship == null)
            {
                return false;
            }

            await _friendshipRepository.DeclineRequest(friendship);
            try
            {
                await _friendshipRepository.Save();

            }
            catch (Exception)
            {
                return false;
            }
            return true;
        }

        public async Task<IEnumerable<Friendship>> GetFriends(string userID)
        {
            return await _friendshipRepository.GetFriends(userID);
        }


        public async Task<IEnumerable<Friendship>> GetRequests(string userID)
        {
            return await _friendshipRepository.GetRequests(userID);
        }

        public async Task<IEnumerable<Friendship>> GetUserFriends(string userId)
        {
            return await _friendshipRepository.GetUserFriends(userId);
        }

        public async Task<ActionResult> SendRequest(LoginModel model)
        {
            return await _friendshipRepository.SendRequest(model);
        }

        public async Task<bool> AddFriendship(Friendship f)
        {
            await _friendshipRepository.AddFriendship(f);
            try
            {
                await _friendshipRepository.Save();

            }
            catch (Exception)
            {
                return false;
            }
            return true;
        }

        public async Task<Friendship> FindFriendship(string userID, string friendId)
        {
            return await _friendshipRepository.FindFriendship(userID, friendId);
        }
    }
}
