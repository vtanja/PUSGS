﻿using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
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
        public DbSet<SegmentPrice> Prices { get; set; }
        public DbSet<Flight> Flights { get; set; }
        public DbSet<OccupiedDate> OccupiedDates { get; set; }
        public DbSet<Airport> Airports { get; set; }
        public DbSet<BonusPointsDiscount> BonusPointsDiscounts { get; set; }

        public DbSet<FlightReservation> FlightReservations{ get; set; }
        public DbSet<Passenger> Passengers{ get; set; }
        public DbSet<Seat> Seats { get; set; }
        public DbSet<FlightFlightReservation> FlightFlightReservation { get; set; }
        public DbSet<UserFlightReservation> UserFlightReservations { get; set; }

        public DbSet<CarRate> CarRates { get; set; }
        public DbSet<CompanyRate> CompanyRates { get; set; }

        public DbSet<FlightRate> FlightRates { get; set; }
        public DbSet<AirlineRate> AirlineRates { get; set; }
    }
}
