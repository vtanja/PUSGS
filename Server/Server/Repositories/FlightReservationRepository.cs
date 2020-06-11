using Microsoft.EntityFrameworkCore;
using Server.IRepositories;
using Server.Models;
using Server.Settings;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;

namespace Server.Repositories
{
    public class FlightReservationRepository:IDisposable, IFlightReservationRepository
    {
        private DataBaseContext _context;
        private bool disposed;

        public FlightReservationRepository(DataBaseContext context)
        {
            _context = context;
            disposed = false;
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

        public bool CheckSeats(FlightReservation flightReservation)
        {
            var occupiedSeatsTo = new List<Seat>();
            var occupiedSeatsBack = new List<Seat>();

            var firstflight = _context.Flights.Where(x=>x.Id == flightReservation.Flights.First().Id).FirstOrDefault();
            List<Seat> occupiedSeats1 = new List<Seat>();
            if (firstflight != null)
            {
                if (firstflight.OccupiedSeats != null)
                {
                    occupiedSeats1.AddRange(firstflight.OccupiedSeats);
                }
            }

            Flight returnFlight=null;
            List<Seat> occupiedSeats2 = new List<Seat>();
            if (flightReservation.Flights.Count == 2)
            {
                returnFlight = _context.Flights.Where(x => x.Id == flightReservation.Flights.Last().Id).FirstOrDefault();
                if (returnFlight != null)
                {
                    if (returnFlight.OccupiedSeats != null)
                    {
                        occupiedSeats2.AddRange(returnFlight.OccupiedSeats);
                    }
                }
            }

            if (occupiedSeats1 != null)
            {
                foreach (var item in flightReservation.Passengers)
                {
                    var seats = occupiedSeats1.Where(x => x.Code == item.Seats.First().Code).ToList();
                    if (seats.Count > 0)
                    {
                        return false;
                    }
                }
            }

            if (occupiedSeats2 != null)
            {
                foreach (var item in flightReservation.Passengers)
                {
                    var seats = occupiedSeats2.Where(x => x.Code == item.Seats.Last().Code).ToList();
                    if (seats.Count > 0)
                    {
                        return false;
                    }
                }
            }

            foreach (var item in flightReservation.Passengers)
            {
                _context.Passengers.Add(item);
                try
                {
                     _context.SaveChanges();
                }
                catch (Exception)
                {
                    return false;
                }
            }

           
            return true;
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

        public void PostFlightReservation(FlightReservation flightReservation)
        {
            _context.FlightReservations.Add(flightReservation);
        }

        public async Task<IEnumerable<FlightReservation>> GetFlightReservations(string userId)
        {
            var reservations = await _context.FlightReservations.Where(x => x.UserId == userId && !x.Cancelled).Include(x => x.CarReservation).Include(x => x.Passengers).ThenInclude(x => x.Seats).ToListAsync();
            foreach (var item in reservations)
            {
                List<int> flightIds = new List<int>();
                foreach (var item2 in item.Passengers)
                {
                    flightIds.Add(item2.Seats.ToArray()[0].FlightId);
                    if (item2.Seats.ToArray().Length == 2)
                    {
                        flightIds.Add(item2.Seats.ToArray()[1].FlightId);
                    }
                }
                foreach (var item2 in flightIds)
                {
                    Flight flight = await _context.Flights.Where(x => x.Id == item2).Include(x => x.LandingLocation).Include(x => x.TakeOffLocation).Include(x => x.Plane).ThenInclude(x => x.Airline).Include(x => x.OccupiedSeats).FirstOrDefaultAsync();
                    if (flight != null)
                    {
                        item.Flights.Add(flight);
                    }


                }
            }

            return reservations;
        }

        public void CancelReservation(FlightReservation reservation)
        {
            reservation.Cancelled = true;
            _context.Entry(reservation).State = EntityState.Detached;
            _context.Entry(reservation).State = EntityState.Modified;

            var seats = _context.Seats.Where(x => x.FlightId == reservation.Flights.ToList()[0].Id).ToList();

            foreach (var item in seats)
            {
                _context.Seats.Remove(item);
            }

            if (reservation.CarReservation != null)
            {
                reservation.CarReservation.Cancelled = true;
            }
        }

        public async Task<FlightReservation> GetFlightReservation(int reservationId)
        {
            return await _context.FlightReservations.Include(f=>f.Flights).Where( r=> r.ReservationId== reservationId).FirstOrDefaultAsync();
        }

        public void UpdateFlightReservation(FlightReservation flightReservation)
        {
            _context.Entry<FlightReservation>(flightReservation).State = EntityState.Modified;
        }
    }
}
