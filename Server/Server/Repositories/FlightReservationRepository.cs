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

        public async Task<FlightReservation> GetFlightReservation(int reservationId)
        {
            return await _context.FlightReservations.Include(f=>f.Flights).Where( r=> r.ReservationId== reservationId).FirstOrDefaultAsync();
        }

        public void UpdateFlightReservation(FlightReservation flightReservation)
        {
            _context.Entry<FlightReservation>(flightReservation).State = EntityState.Modified;
        }

        public async Task<Dictionary<string, int>> GetDailyReservationReport(int companyId)
        {
            var ret = await _context.FlightFlightReservation.Include(x => x.Flight).ThenInclude(x => x.TakeOffLocation).Include(x => x.Flight).ThenInclude(x => x.LandingLocation).Include(x => x.Flight).ThenInclude(x => x.Plane).Include(x => x.Reservation).ThenInclude(x=>x.Passengers).Where(x => x.Flight.Plane.AirlineId == companyId && !x.Reservation.Cancelled && x.Reservation.DateCreated == DateTime.Now.Date).ToListAsync();
            var flightIds = ret.Select(x => x.FlightId).ToList();
            var flights = ret.Select(x => x.Flight).ToList();

            var res = ret.GroupBy(x => x.FlightId).ToDictionary(g => g.Key, g => g.Sum(x => x.Reservation.Passengers.Count));

            var notIn = await _context.Flights.Include(x => x.Plane).Include(x => x.LandingLocation).Include(x => x.TakeOffLocation).Where(x => x.Plane.AirlineId == companyId && !flightIds.Contains(x.Id)).ToListAsync();

            var toAdd = ret.GroupBy(r => r.FlightId).ToDictionary(g => g.Key, g => res[g.Key]);

            Dictionary<string, int> result = new Dictionary<string, int>();

            foreach (var x in toAdd)
            {
                var flight = flights.Where(y => y.Id == x.Key).FirstOrDefault();
                result.Add(flight.TakeOffLocation.Code + ", " + flight.TakeOffDate + " " + flight.TakeOffTime + "-" + flight.LandingLocation.Code + ", " + flight.LandingDate + " " + flight.LandingTime + "\n[Id: " + flight.Id.ToString() + "]", x.Value);
            }


            foreach (var x in notIn)
            {
                result.Add(x.TakeOffLocation.Code + ", " + x.TakeOffDate + " " + x.TakeOffTime + "-" + x.LandingLocation.Code + ", " + x.LandingDate + " " + x.LandingTime + "\n[Id: " + x.Id.ToString() + "]", 0);
            }

            return result;
        }

        public async Task<Dictionary<string, int>> GetRangeReservationReport(int companyId, DateTime startDate, DateTime endDate)
        {
            var ret = await _context.FlightFlightReservation.Include(x => x.Flight).ThenInclude(x=>x.TakeOffLocation).Include(x => x.Flight).ThenInclude(x => x.LandingLocation).Include(x=>x.Flight).ThenInclude(x => x.Plane).Include(x => x.Reservation).ThenInclude(x=>x.Passengers).Where(x => x.Flight.Plane.AirlineId == companyId && !x.Reservation.Cancelled && x.Reservation.DateCreated >= startDate.Date && x.Reservation.DateCreated <= endDate.Date).ToListAsync();
            
            var flightIds = ret.Select(x => x.FlightId).ToList();
            var flights = ret.Select(x => x.Flight).ToList();
            var res = ret.GroupBy(x => x.FlightId).ToDictionary(g => g.Key, g => g.Sum(x => x.Reservation.Passengers.Count));

            var notIn = await _context.Flights.Include(x=>x.Plane).Include(x => x.LandingLocation).Include(x => x.TakeOffLocation).Where(x => x.Plane.AirlineId == companyId && !flightIds.Contains(x.Id)).ToListAsync();

            var toAdd = ret.GroupBy(r=>r.FlightId).ToDictionary(g => g.Key, g => res[g.Key]);

            Dictionary<string, int> result = new Dictionary<string, int>();

            foreach (var x in toAdd)
            {
                var flight = flights.Where(y => y.Id == x.Key).FirstOrDefault();
                result.Add(flight.TakeOffLocation.Code + ", " + flight.TakeOffDate + " " + flight.TakeOffTime + "-" + flight.LandingLocation.Code + ", " + flight.LandingDate + " " + flight.LandingTime + "\n[Id: " + flight.Id.ToString() + "]", x.Value);
            }


            foreach (var x in notIn)
            {
                result.Add(x.TakeOffLocation.Code + ", " + x.TakeOffDate + " " + x.TakeOffTime + "-" + x.LandingLocation.Code + ", " + x.LandingDate + " " + x.LandingTime + "\n[Id: " + x.Id.ToString() + "]", 0);
            }

            return result;
        }

        public async Task<Dictionary<int, double>> GetMonthlyIncomes(int companyId, int month, int year)
        {
            var ret = await _context.FlightFlightReservation.Include(x => x.Reservation).Include(x => x.Flight).ThenInclude(x => x.Plane).
                Where(x => x.Flight.Plane.AirlineId == companyId && !x.Reservation.Cancelled && x.Reservation.DateCreated.Date.Year == year && x.Reservation.DateCreated.Date.Month == month).ToListAsync();
            
            var result = ret.GroupBy(r => r.Reservation.DateCreated.Date.Day).ToDictionary(g => g.Key, g => g.Sum(r => r.Reservation.TotalPrice));

            return result; ;
        }

        public async Task<Dictionary<int, double>> GetAnnualIncomes(int companyId, int year)
        {
            var ret = await _context.FlightFlightReservation.Include(x=>x.Reservation).Include(x=>x.Flight).ThenInclude(x=>x.Plane).Where(x => x.Flight.Plane.AirlineId == companyId && !x.Reservation.Cancelled && x.Reservation.DateCreated.Date.Year == year).ToListAsync();

            var result = ret.GroupBy(r => r.Reservation.DateCreated.Date.Month).ToDictionary(g => g.Key, g => g.Sum(r => r.Reservation.TotalPrice));

            return result;
        }

        public bool UpdateReservations()
        {
            var reservations = _context.FlightFlightReservation.Include(x => x.Flight).ThenInclude(x => x.OccupiedSeats).Include(x => x.Reservation).ThenInclude(x => x.Passengers).Where(x=>!x.Reservation.Cancelled).ToList();

            foreach (var item in reservations)
            {
                DateTime takeOffDate = new DateTime(Convert.ToInt32(item.Flight.TakeOffDate.Split('-')[2]),Convert.ToInt32(item.Flight.TakeOffDate.Split('-')[1]),Convert.ToInt32(item.Flight.TakeOffDate.Split('-')[0]));

                int hours = Convert.ToInt32(item.Flight.TakeOffTime.Split(':')[0]);
                int minutes = Convert.ToInt32(item.Flight.TakeOffTime.Split(':')[1]);

                TimeSpan ts = new TimeSpan(hours, minutes, 0);
                takeOffDate = takeOffDate.Date + ts;

                if (takeOffDate.Date<DateTime.Now.Date || takeOffDate.Date.TimeOfDay < DateTime.Now.Date.TimeOfDay)
                {
                    foreach (var passenger in item.Reservation.Passengers)
                    {
                        var user = _context.Users.Include(x => x.RegisteredUser).Where(x => x.RegisteredUser.FirstName == passenger.FirstName && x.RegisteredUser.LastName == passenger.LastName).FirstOrDefault();
                        if (user != null)
                        {
                            if (item.Flight.Duration <= 1200 && !passenger.AcceptedInvitation)
                            {
                                user.BonusPoints += 15;
                                passenger.AddedBonus = true;
                            }
                            else
                            {
                                user.BonusPoints += 30;
                                passenger.AddedBonus = true;
                            }
                        }

                        try
                        {
                            _context.Entry(user).State = EntityState.Detached;
                            _context.Entry(user).State = EntityState.Modified;
                        }
                        catch (Exception)
                        {
                            _context.Entry(user).State = EntityState.Unchanged;
                            return false;
                        }

                    }
                }
                
            }

            var now = DateTime.Now;

            reservations =  _context.FlightFlightReservation.Include(x => x.Flight).ThenInclude(x => x.OccupiedSeats).Include(x => x.Reservation).ThenInclude(x => x.Passengers).Where(x => x.Reservation.DateCreated >= DateTime.Now.Date && !x.Reservation.Cancelled).ToList();

            foreach (var item in reservations)
            {
                

                if ((item.Reservation.DateCreated.Date - now.Date).TotalDays < 2 || ((item.Reservation.DateCreated.Date - now.Date).TotalDays == 2 && (item.Reservation.DateCreated.TimeOfDay - now.Date.TimeOfDay).TotalSeconds<7140))
                {
                    List<Passenger> toRemove = new List<Passenger>();
                    for (int i = 0; i <= item.Reservation.Passengers.ToList().Count-1; i++)
                    {
                        if (!item.Reservation.Passengers.ToList()[i].AcceptedInvitation)
                        {
                            List<Seat> seatsToRemove = new List<Seat>();

                            var flights = reservations.Where(x => x.ReservationId == item.ReservationId).ToList();
                            for (int j = 0; j <= flights.Count-1; j++)
                            {
                                
                                    var seat = item.Reservation.Passengers.ToList()[i].Seats.ToArray()[j];
                                    if (flights.ToArray()[j].Flight.OccupiedSeats.Contains(seat))
                                    {
                                        flights.ToArray()[j].Flight.OccupiedSeats.ToList().RemoveAt(j);
                                    }

                                    toRemove.Add(item.Reservation.Passengers.ToList()[i]);
                                seatsToRemove.Add(seat);
                                    //item.Reservation.Passengers.ToList()[i].Seats.ToList().RemoveAt(j);
                                    //item.Reservation.Passengers.ToList().RemoveAt(i);
                                    //_context.Passengers.Remove(item.Reservation.Passengers.ToList()[i]); 
                               

                            }

                            foreach (var item2 in seatsToRemove)
                            {
                                if (seatsToRemove.Contains(item2))
                                {
                                    item.Reservation.Passengers.ToList()[i].Seats.ToList().Remove(item2);
                                }
                                
                            }

                        }
                    }

                    foreach (var item2 in toRemove)
                    {
                        if (item.Reservation.Passengers.ToList().Contains(item2))
                        {
                            item.Reservation.Passengers.ToList().Remove(item2);

                            item.Reservation.TotalPrice = item.Reservation.TotalPrice - item.FlightPrice;
                        }
                        _context.Passengers.Remove(item2);
                    }
                }
            }

            return true;

        }
    }
}
