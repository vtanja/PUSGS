using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.DTOs;
using Server.IRepositories;
using Server.Models;
using Server.Settings;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Repositories
{
    public class FriendshipRepository : IDisposable, IFriendshipRepository
    {
        private DataBaseContext _context;
        private bool disposed;

        public FriendshipRepository(DataBaseContext context)
        {
            _context = context;
            this.disposed = false;
        }

        public async Task<Friendship> AcceptFriend(Friendship friendship)
        {
            friendship.Accepted = true;
            _context.Entry(friendship).State = EntityState.Detached;
            _context.Entry(friendship).State = EntityState.Modified;

            return friendship;
        }

        public async Task<Friendship> DeclineRequest(Friendship friendship)
        {
            _context.Friendships.Remove(friendship);
            return friendship;
        }

        public async Task<IEnumerable<Friendship>> GetFriends(string userID)
        {
            var users1 = await _context.Friendships.Include(x => x.Friend).ThenInclude(x => x.RegisteredUser).Where(x => x.UserID == userID && x.Accepted).ToListAsync();
           users1.AddRange(await _context.Friendships.Include(x => x.User).ThenInclude(x => x.RegisteredUser).Where(x => x.FriendID == userID && x.Accepted).ToListAsync());
            return users1.ToList();
        }

        public async Task<IEnumerable<Friendship>> GetRequests(string userID)
        {
            return await _context.Friendships.Include(x => x.User).ThenInclude(x => x.RegisteredUser).Where(x => x.FriendID == userID && !x.Accepted).ToListAsync();
        }

        public Task<ActionResult> SendRequest(LoginModel model)
        {
            throw new NotImplementedException();
        }
        protected virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    _context.Dispose();
                }
            }
            this.disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        public async Task Save()
        {
            await _context.SaveChangesAsync();
        }

        public async Task AddFriendship(Friendship f)
        {
            await _context.Friendships.AddAsync(f);
        }

        public async Task<IEnumerable<Friendship>> GetUserFriends(string userId)
        {
            return await _context.Friendships.Include(x => x.Friend).Where(x => x.UserID == userId).ToListAsync();
        }

        public async Task<Friendship> FindFriendship(string userID, string friendId)
        {
            return await _context.Friendships.FirstOrDefaultAsync(x => x.FriendID == userID && x.UserID == friendId);
        }

    }
}
