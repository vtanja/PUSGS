using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Settings
{
    public class DataBaseContext : IdentityDbContext
    {
        public DataBaseContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<RegisteredUser> RegisteredUsers { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<RentCarAdmin> RentCarAdmins{ get; set; }
        public DbSet<AirlineAdmin> AirlineAdmins { get; set; }
        public DbSet<Administrator> Administrators { get; set; }

        
    }
}
