using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Server.Models;

namespace Server.Settings
{
    public class DataBaseContext : IdentityDbContext
    {
        public DataBaseContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<RegisteredUser> RegisteredUsers { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Friendship> Friendships { get; set; }
        public DbSet<RentCarAdmin> RentCarAdmins { get; set; }
        public DbSet<AirlineAdmin> AirlineAdmins { get; set; }
        public DbSet<Administrator> Administrators { get; set; }
        public DbSet<Server.Models.RentCar> RentCars { get; set; }
        public DbSet<Server.Models.Car> Cars { get; set; }
        public DbSet<Office> Offices { get; set; }
        public DbSet<Airline> Airlines { get; set; }
        public DbSet<Plane> Planes { get; set; }
        public DbSet<Segment> Segments { get; set; }

        public DbSet<Destination> Destinations { get; set; }
        public DbSet<Address> Addresses { get; set; }
        public DbSet<DiscountDate> DiscountDates { get; set; }
        public DbSet<ReservedDate> ReservedDates { get; set; }
        public DbSet<CarReservation> CarReservations { get; set; }


    }
}
