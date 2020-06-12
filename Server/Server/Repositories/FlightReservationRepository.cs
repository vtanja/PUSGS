using Microsoft.EntityFrameworkCore;
using Server.IRepositories;
using Server.Models;
using Server.Settings;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices.ComTypes;
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

        public bool CheckSeats(FlightReservation flightReservation, List<int> flightIds)
        {
            var occupiedSeatsTo = new List<Seat>();
            var occupiedSeatsBack = new List<Seat>();
            List<FlightFlightReservation> flights = new List<FlightFlightReservation>();

            foreach (var item in flightIds)
            {
                var toAdd = _context.FlightFlightReservation.Include(x => x.Reservation).ThenInclude(x=>x.Passengers).ThenInclude(x=>x.Seats).Include(x=>x.Flight).ThenInclude(x=>x.OccupiedSeats).Where(x => x.FlightId == item && !x.Reservation.Cancelled).ToList();
                foreach (var item2 in toAdd)
                {
                    flights.Add(item2);
                }
            }

            if (flights != null)
            {
                foreach (var item in flights)
                {
                    List<Seat> chosenSeats = new List<Seat>();
                    foreach (var item2 in flightReservation.Passengers)
                    {
                        item2.Seats.ToList().ForEach(x => chosenSeats.Add(x));
                    }
                    foreach (var item2 in chosenSeats)
                    {
                        if (item.Flight.OccupiedSeats.Where(x => x.Code == item2.Code).ToList().Count > 0)
                        {
                            return false;
                        }
                        else
                        {
                            item.Flight.OccupiedSeats.ToList().AddRange(chosenSeats);
                        }
                    }

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
            var user = await  _context.Users.Include(x => x.FlightReservations).Where(x => x.UserId == userId).FirstOrDefaultAsync();
            var userFlights = _context.UserFlightReservations.Where(x => x.UserId == userId).Include(x=>x.Reservation);

            List<FlightFlightReservation> flightReservations = new List<FlightFlightReservation>();

            foreach (var item in userFlights)
            {
                var res = await _context.FlightFlightReservation.Where(x => x.ReservationId == item.ReservationId && !x.Reservation.Cancelled).Include(x => x.Flight).ThenInclude(x => x.LandingLocation).Include(x => x.Flight).ThenInclude(x => x.TakeOffLocation).Include(x => x.Flight).ThenInclude(x => x.OccupiedSeats).Include(x => x.Flight).ThenInclude(x => x.Plane).Include(x => x.Flight).ThenInclude(x => x.SegmentPrices).Include(x => x.Reservation).ThenInclude(x => x.Passengers).Include(x => x.Reservation).ThenInclude(x => x.CarReservation).FirstOrDefaultAsync();
                if (res != null)
                {
                    flightReservations.Add(res);
                }
            }


            //var toAdd = await _context.FlightFlightReservation.Include(x => x.Flight).ThenInclude(x => x.LandingLocation).Include(x => x.Flight).ThenInclude(x => x.TakeOffLocation).Include(x => x.Flight).ThenInclude(x => x.OccupiedSeats).Include(x => x.Flight).ThenInclude(x => x.Plane).Include(x => x.Flight).ThenInclude(x => x.SegmentPrices).Include(x => x.Reservation).ThenInclude(x => x.Passengers).Include(x => x.Reservation).ThenInclude(x => x.CarReservation).Where(x => x.Reservation.UserId == userId && !x.Reservation.Cancelled).ToListAsync();

            //if (toAdd != null)
            //{
            //    flightReservations.AddRange(toAdd);
            //}

            foreach (var item in flightReservations)
            {
                //List<int> flightIds = new List<int>();
                //foreach (var item2 in item.Passengers)
                //{
                //    flightIds.Add(item2.Seats.ToArray()[0].FlightId);
                //    if (item2.Seats.ToArray().Length == 2)
                //    {
                //        flightIds.Add(item2.Seats.ToArray()[1].FlightId);
                //    }
                //}

                //item.Value.First().Reservation.Flights.Add(item.Value.First().Flight);

                item.Reservation.Flights.Add(item.Flight);
            }

            List<FlightReservation> reservations = new List<FlightReservation>();
            //foreach (var item in flightReservations)
            //{
            //    reservations.Add(item.Value.First().Reservation);
            //}

            foreach (var item in flightReservations)
            {
                if (reservations.Where(x => x.ReservationId == item.ReservationId).ToList().Count == 0)
                {
                    reservations.Add(item.Reservation);
                }
            }

            //flightReservations.ForEach(x => reservations.Add(x.Reservation));
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
    }
}
