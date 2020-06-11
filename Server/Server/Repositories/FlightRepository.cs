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
    public class FlightRepository:IDisposable, IFlightRepository
    {
        private DataBaseContext _context;
        private bool disposed;

        public FlightRepository(DataBaseContext context)
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
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        public async Task Save()
        {
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Flight>> GetFlights(List<Plane> planes)
        {
            var flights = new List<Flight>();
            foreach (var item in planes)
            {
                flights.AddRange(await _context.Flights.Where(x => x.PlaneId == item.Code).Include(x => x.Connections).Include(x=>x.OccupiedSeats).Include(x => x.SegmentPrices).ThenInclude(x => x.Segment).Include(x => x.Plane).ThenInclude(x => x.Airline).Include(x => x.TakeOffLocation).Include(x => x.LandingLocation).ToListAsync());
            }
            return flights;
        }

        public async  Task<Flight> GetFlight(int id)
        {
            return await _context.Flights.Include(x=>x.LandingLocation).Include(x=>x.TakeOffLocation).Include(x=>x.SegmentPrices).Include(x => x.Connections).Include(x=>x.OccupiedSeats).Include(x=>x.Plane).ThenInclude(x=>x.Segments).Where(x=>x.Id == id).FirstOrDefaultAsync();
        }

        public void DeleteFlight(Flight flight)
        {
            _context.Flights.Remove(flight);
        }

        public async Task<IEnumerable<Flight>> SearchFlights(SearchFlightModel model)
        {
            //DateTime takeOffDate = new DateTime(Convert.ToInt32(model.DepartureDate.Split('-')[2]),Convert.ToInt32( model.DepartureDate.Split('-')[1]),Convert.ToInt32( model.DepartureDate.Split('-')[0]));

            var allFlights = await _context.Flights.Include(x => x.Connections).Include(x => x.TakeOffLocation).Include(x => x.LandingLocation).Include(x=>x.Plane).ThenInclude(x=>x.Segments).Include(x=>x.OccupiedSeats).Include(x=>x.SegmentPrices).ToListAsync();
            var searched = new List<Flight>();
            searched.AddRange(allFlights.Where(x => x.TakeOffDate == model.DepartureDate && x.Connections.Count == 0 && x.TakeOffLocation.Code == model.TakeOffLocation && x.LandingLocation.Code == model.LandingLocation).ToList());
            var classFits = new List<Flight>();
            foreach (var item in searched)
            {
                if (item.Plane.Segments.Where(x => x.Name.ToLower() == model.Class.ToLower()).FirstOrDefault() != null)
                {
                    classFits.Add(item);
                }
            }

            var retVal = new List<Flight>();

            //kad skontam kako cuvati zauzeta mest, dodati proveru da li ima slobodnih mesta koliko putnika
            //foreach (var item in classFits)
            //{
            //    if(item.Plane.Segments.)
            //}

            return classFits;
        }

        public async Task<IEnumerable<Flight>> SearchMultiFlights(SearchFlightModel model)
        {
            //DateTime takeOffDate = new DateTime(Convert.ToInt32(model.DepartureDate.Split('-')[2]),Convert.ToInt32( model.DepartureDate.Split('-')[1]),Convert.ToInt32( model.DepartureDate.Split('-')[0]));

            var allFlights = await _context.Flights.Include(x => x.Connections).Include(x => x.TakeOffLocation).Include(x => x.OccupiedSeats).Include(x => x.LandingLocation).Include(x => x.Plane).ThenInclude(x => x.Segments).Include(x => x.SegmentPrices).ToListAsync();
            var searched = new List<Flight>();
            searched.AddRange(allFlights.Where(x => x.TakeOffDate == model.DepartureDate && x.Connections.Count > 0 && x.TakeOffLocation.Code == model.TakeOffLocation && x.LandingLocation.Code == model.LandingLocation).ToList());
            var classFits = new List<Flight>();
            foreach (var item in searched)
            {
                if (item.Plane.Segments.Where(x => x.Name.ToLower() == model.Class.ToLower()).FirstOrDefault() != null)
                {
                    classFits.Add(item);
                }
            }

            var retVal = new List<Flight>();

            //kad skontam kako cuvati zauzeta mest, dodati proveru da li ima slobodnih mesta koliko putnika
            //foreach (var item in classFits)
            //{
            //    if(item.Plane.Segments.)
            //}

            return classFits;
        }

        public async Task<IEnumerable<Tuple<Flight, Flight>>> SearchRoundFlights(SearchFlightModel model)
        {
            List<Flight> toFlights = new List<Flight>();
            toFlights.AddRange(await SearchFlights(model));


            SearchFlightModel model2 = new SearchFlightModel()
            {
                TakeOffLocation = model.LandingLocation,
                DepartureDate = model.ReturnDate,
                LandingLocation = model.TakeOffLocation,
                Class = model.Class,
                Passengers = model.Passengers,
                ReturnDate = null
            };

            List<Flight> backFlights = new List<Flight>();
            backFlights.AddRange(await SearchFlights(model2));


            List<Tuple<Flight, Flight>> retVal = new List<Tuple<Flight, Flight>>();

            foreach (var item1 in toFlights)
            {
                string[] dateParts1 = item1.LandingDate.Split('-');
                DateTime item1landingDate = new DateTime(Convert.ToInt32(dateParts1[2]), Convert.ToInt32(dateParts1[1]), Convert.ToInt32(dateParts1[0]));

                foreach (var item2 in backFlights)
                {
                    string[] dateParts2 = item2.TakeOffDate.Split('-');
                    DateTime item2takeOffDate = new DateTime(Convert.ToInt32(dateParts2[2]), Convert.ToInt32(dateParts2[1]), Convert.ToInt32(dateParts2[0]));

                    if (item2takeOffDate.Date < item1landingDate.Date)
                    {
                        continue;
                    }

                    if (item2takeOffDate.Date == item1landingDate.Date)
                    {
                        if (Convert.ToInt32( item2.TakeOffTime.Split(':')[0]) < Convert.ToInt32( item1.LandingTime.Split(':')[0]))
                        {
                            continue;
                        }
                        else if (Convert.ToInt32(item2.TakeOffTime.Split(':')[0]) == Convert.ToInt32(item1.LandingTime.Split(':')[0]))
                        {
                            if (Convert.ToInt32(item2.TakeOffTime.Split(':')[1]) <= Convert.ToInt32(item1.LandingTime.Split(':')[1]))
                            {
                                continue;
                            }
                        }

                    }

                    retVal.Add(new Tuple<Flight, Flight>(item1, item2));
                }
            }
            return retVal;
            }

        public async Task<IEnumerable<Flight>> GetAllFlights()
        {
            return await _context.Flights.Include(x => x.LandingLocation).Include(x => x.TakeOffLocation).ToListAsync();
        }

        public void UpdateFlight(Flight flight)
        {
            _context.Entry<Flight>(flight).State = EntityState.Detached;
            _context.Entry<Flight>(flight).State = EntityState.Modified;
        }

        public async Task<IEnumerable<Seat>> GetOccupiedSeats(int flightId)
        {
            var seats = await _context.Seats.Where(x => x.FlightId == flightId).ToListAsync();

            return seats;
        }
    }
}
