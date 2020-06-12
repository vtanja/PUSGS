using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Models;
using Server.Services;
using Server.Settings;
using Server.UOW;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FlightReservationsController : ControllerBase
    {
        private readonly DataBaseContext _context;
        private readonly FlightReservationService flightReservationService;
        private readonly Email.IEmailSender _emailSender;

        public FlightReservationsController(DataBaseContext context, UnitOfWork unitOfWork, Email.IEmailSender emailSender)
        {
            _context = context;
            flightReservationService = unitOfWork.FlightReservationService;
            _emailSender = emailSender;
        }

        // GET: api/FlightReservations
        [HttpGet]
        [Route("All")]
        public async Task<IEnumerable<FlightReservation>> GetFlightReservations()
        {
            var userId = User.Claims.First(c => c.Type == "UserID").Value;

            return await flightReservationService.GetFlightReservations(userId);
        }

        // GET: api/FlightReservations/5
        [HttpGet("{id}")]
        public async Task<ActionResult<FlightReservation>> GetFlightReservation(int id)
        {
            var flightReservation = await _context.FlightReservations.FindAsync(id);

            if (flightReservation == null)
            {
                return NotFound();
            }

            return flightReservation;
        }

        // PUT: api/FlightReservations/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFlightReservation(int id, FlightReservation flightReservation)
        {
            if (id != flightReservation.ReservationId)
            {
                return BadRequest();
            }

            if(!await flightReservationService.CancelReservation(flightReservation))
            {
                return BadRequest(new { message = "Error while canceling reservation! " });
            }

            return NoContent();
        }

        // POST: api/FlightReservations
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<FlightReservation>> PostFlightReservation(FlightReservationModel flightReservation)
        {
            var userId = User.Claims.First(c => c.Type == "UserID").Value;
            var user = await _context.Users.Include(x => x.RegisteredUser).Include(x=>x.FlightReservations).ThenInclude(x=>x.Reservation).ThenInclude(x=>x.Flights).Where(x => x.UserId == userId).FirstOrDefaultAsync();

            List<FlightFlightReservation> flightReservations = new List<FlightFlightReservation>();

            var userRes = await _context.UserFlightReservations.Where(x => x.UserId == userId).Include(x => x.Reservation).ThenInclude(x => x.Flights).ToListAsync();
            foreach (var item in userRes)
            {
                var flights = await _context.FlightFlightReservation.Include(x=>x.Flight).Where(x => x.ReservationId == item.ReservationId).ToListAsync();
                foreach (var item2 in flights)
                {
                    if (flightReservation.FlightsIds.Contains(item2.Id))
                    {
                        return BadRequest(new { message = "User has already made a reservation on this flight! " });
                    }
                }
            }
            //foreach (var item in user.FlightReservations)
            //{
            //    flightReservations.AddRange(await _context.FlightFlightReservation.Where(x => x.Reservation.Users.Contains(user) && flightReservation.FlightsIds.Contains(x.FlightId) && !x.Reservation.Cancelled).ToListAsync());
            //}

            //if (flightReservations.Count > 0)
            //{
               
            //}

            FlightReservation fr = new FlightReservation()
            {
                CarReservation = flightReservation.CarReservation,
                Cancelled = flightReservation.Cancelled,
                FlightRated = flightReservation.FlightRated,
                AirlineRated = flightReservation.AirlineRated,
                Passengers = flightReservation.Passengers,
                TotalPrice = flightReservation.TotalPrice,
                DateCreated = DateTime.Now
            };

            
            
            if (await flightReservationService.PostFlightReservation(fr, flightReservation.FlightsIds))
            {
                UserFlightReservation resToAdd = new UserFlightReservation();
                resToAdd.UserId = userId;
                resToAdd.User = user;
                resToAdd.ReservationId = fr.ReservationId;
                resToAdd.Reservation = fr;

                _context.UserFlightReservations.Add(resToAdd);

                foreach (var item in flightReservation.FlightsIds)
                {
                    var flight = await _context.Flights.Where(x => x.Id == item).Include(x => x.LandingLocation).Include(x => x.TakeOffLocation).FirstAsync();
                    if (flight != null)
                    {
                        //fr.Flights.Add(flight);
                        FlightFlightReservation reservation = new FlightFlightReservation();
                        reservation.Flight = flight;
                        reservation.FlightId = flight.Id;
                        reservation.Reservation = fr;
                        reservation.ReservationId = fr.ReservationId;
                        _context.FlightFlightReservation.Add(reservation);
                    }
                }
                if (flightReservation.CarReservation != null)
                {
                    fr.CarReservationId = flightReservation.CarReservation.Id;
                }

                //user.FlightReservations.Add(fr);

                try
                {
                    await _context.SaveChangesAsync();
                }
                catch (Exception)
                {
                    return BadRequest(new { message = "Error while creating reservation! " });
                }

                var res = await _context.FlightFlightReservation.Where(x => x.ReservationId == fr.ReservationId).Include(x => x.Reservation).ThenInclude(x => x.Flights).ThenInclude(x => x.LandingLocation)
                                                                                                                   .Include(x => x.Reservation).ThenInclude(x => x.Flights).ThenInclude(x => x.TakeOffLocation)
                                                                                                                   .Include(x => x.Reservation).ThenInclude(x => x.CarReservation).ToListAsync();

                foreach (var item in res)
                {
                    fr.Flights.Add(item.Flight);
                }

                if (fr.Passengers.Count > 1)
                {

                    SendConfirmationMail(user, fr);
                }
                SendReservationDetail(user.RegisteredUser.Email, fr);
                
            }
            else
            {
                return BadRequest(new { message = "Error while creating reservation! " });
            }

            return NoContent();
        }

        private async void  SendConfirmationMail(User user, FlightReservation flightReservation)
        {
            
            

            var message = "You have one new invitation to travel with your friend: " + user.RegisteredUser.FirstName + " " + user.RegisteredUser.LastName + ".";
            message += "\n Flight info: ";
            message += "\nFrom: " + flightReservation.Flights.First().TakeOffLocation.Location + ", " + flightReservation.Flights.First().TakeOffDate + " at " + flightReservation.Flights.First().TakeOffTime;
            message += "\nTo: " + flightReservation.Flights.First().LandingLocation.Location + ", " + flightReservation.Flights.First().LandingDate + " at " + flightReservation.Flights.First().LandingTime;

            if (flightReservation.Flights.Count == 2)
            {
                message += "\n\nReturn flight info:";
                message += "\nFrom: " + flightReservation.Flights.Last().TakeOffLocation.Location + ", " + flightReservation.Flights.Last().TakeOffDate + " at " + flightReservation.Flights.Last().TakeOffTime;
                message += "\nTo: " + flightReservation.Flights.Last().LandingLocation.Location + ", " + flightReservation.Flights.Last().LandingDate + " at " + flightReservation.Flights.Last().LandingTime;

            }

            if (flightReservation.CarReservation == null)
            {
                message += "\nCar is not included.";
            }
            else
            {
                message += "\n Car is also included.";
            }
            message += "\nPrice: " + flightReservation.TotalPrice;

            var passengers = flightReservation.Passengers.Where(x => x.SendInvitation == true);
            foreach (var item in passengers)
            {
                var passenger = await _context.Users.Include(x => x.RegisteredUser).Where(x => x.RegisteredUser.FirstName == item.FirstName && x.RegisteredUser.LastName == item.LastName).FirstOrDefaultAsync();
                var confirmationLink = Url.Action(nameof(ConfirmFlightReservation), "FlightReservations", new {UserId = passenger.UserId, ReservationId = flightReservation.ReservationId }, protocol: HttpContext.Request.Scheme);
                var declineLink = Url.Action(nameof(DeclineFlightReservation), "FlightReservations", new { UserId = passenger.UserId, ReservationId = flightReservation.ReservationId }, protocol: HttpContext.Request.Scheme);
                message += "\n\n Please confirm invitation by clicking on this link: <a href=\"" + confirmationLink + "\">click here.</a> or reject invitation by clicking <a href=\"" + declineLink + "\">here.</a>";
                await _emailSender.SendEmailAsync(passenger.RegisteredUser.Email, "Travellix - Invitation", message);
            }
        }

        private async void SendReservationDetail(string email, FlightReservation flightReservation)
        {

            var message = "Thank you for your reservation. Here are reservation details: ";
            message += "\n Flight info: ";
            message += "\nFrom: " + flightReservation.Flights.Last().TakeOffLocation.Location + ", " + flightReservation.Flights.First().TakeOffDate + " at " + flightReservation.Flights.First().TakeOffTime;
            message += "\nTo: " + flightReservation.Flights.First().LandingLocation.Location + ", " + flightReservation.Flights.First().LandingDate + " at " + flightReservation.Flights.First().LandingTime;

            if (flightReservation.Flights.Count == 2)
            {
                message += "\n\nReturn flight info:";
                message += "\nFrom: " + flightReservation.Flights.Last().TakeOffLocation.Location + ", " + flightReservation.Flights.Last().TakeOffDate + " at " + flightReservation.Flights.Last().TakeOffTime;
                message += "\nTo: " + flightReservation.Flights.Last().LandingLocation.Location + ", " + flightReservation.Flights.Last().LandingDate + " at " + flightReservation.Flights.Last().LandingTime;

            }
            if (flightReservation.CarReservation == null)
            {
                message += "\nCar is not included.";
            }
            else
            {
                message += "\n Car is also included.";
                message += "\n\n\tCar reservation details: ";
                message += "\n\n\tCar model: " + flightReservation.CarReservation.Car.Model;
                message += "\n\n\tPick up date: " + flightReservation.CarReservation.PickUpDate;
                message += "\n\n\tDrop off date: " + flightReservation.CarReservation.DropOffDate;
                message += "\n\n\tRent car company: " + flightReservation.CarReservation.Car.CarCompany.Name;
            }
            message += "\nTotal price: " + flightReservation.TotalPrice;

            await _emailSender.SendEmailAsync(email, "Travellix - Reservation details", message);
        }

        // DELETE: api/FlightReservations/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<FlightReservation>> DeleteFlightReservation(int id)
        {
            var flightReservation = await _context.FlightReservations.FindAsync(id);
            if (flightReservation == null)
            {
                return NotFound();
            }

            _context.FlightReservations.Remove(flightReservation);
            await _context.SaveChangesAsync();

            return flightReservation;
        }

        private bool FlightReservationExists(int id)
        {
            return _context.FlightReservations.Any(e => e.ReservationId == id);
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> ConfirmFlightReservation(string userId, int reservationId)
        {
            if (reservationId==null)
            {
                ModelState.AddModelError("", "Id is required");
                return BadRequest(ModelState);
            }

            var user = await _context.Users.Where(x => x.UserId == userId).Include(x => x.FlightReservations).Include(x => x.RegisteredUser).FirstOrDefaultAsync();

            var reservation = _context.FlightReservations.Where(x => x.ReservationId == reservationId).Include(x=>x.Passengers).Include(x=>x.Flights).FirstOrDefault();
            var flight = await _context.FlightFlightReservation.Where(x => x.ReservationId == reservationId).Include(x=>x.Flight).ToListAsync();

            if (reservation==null)
            {
                return new JsonResult("ERROR");
            }

             var passenger = _context.Passengers.Where(x => !x.AcceptedInvitation && x.FirstName==user.RegisteredUser.FirstName && x.LastName == user.RegisteredUser.LastName).FirstOrDefault();

            if (passenger == null)
            {
                return RedirectToAction("ReservationAlreadyConfirmed", "Notifications");
            }
            else
            {
                DateTime takeOff = new DateTime(Convert.ToInt32(flight.First().Flight.TakeOffDate.Split('-')[2]), Convert.ToInt32(flight.First().Flight.TakeOffDate.Split('-')[1]), 
                        Convert.ToInt32(flight.First().Flight.TakeOffDate.Split('-')[0]));
                takeOff.AddHours(Convert.ToDouble(flight.First().Flight.TakeOffTime.Split(':')[0]));
                takeOff.AddMinutes(Convert.ToDouble(flight.First().Flight.TakeOffTime.Split(':')[1]));

                if ((DateTime.Now - reservation.DateCreated).TotalDays < 3 && (takeOff - DateTime.Now).TotalHours > 3)
                {
                    passenger.AcceptedInvitation = true;

                    UserFlightReservation resToAdd = new UserFlightReservation();
                    resToAdd.UserId = userId;
                    resToAdd.User = user;
                    resToAdd.ReservationId = reservationId;
                    resToAdd.Reservation = reservation;

                    _context.UserFlightReservations.Add(resToAdd);

                    //user.FlightReservations.Add(reservation);
                    try
                    {
                        await _context.SaveChangesAsync();
                    }
                    catch (Exception)
                    {
                        return BadRequest();
                    }

                    return RedirectToAction("InvitationConfirmed", "Notifications");
                }
                else
                {
                    return RedirectToAction("LateConfirm", "Notifications");
                }
            }

            //if (passenger!=null)
            //{
            //    return Redirect("http://localhost:4200//user/reservations/flight-reservations");
            //}

            //var result = await _userManager.ConfirmEmailAsync(user, code);
            

        }

        [HttpGet("[action]")]
        public async Task<IActionResult> DeclineFlightReservation(string userId, int reservationId)
        {
            if (reservationId == null)
            {
                ModelState.AddModelError("", "Id is required");
                return BadRequest(ModelState);
            }

            var user = await _context.Users.Where(x => x.UserId == userId).Include(x => x.FlightReservations).Include(x => x.RegisteredUser).FirstOrDefaultAsync();

            var reservation = _context.FlightReservations.Where(x => x.ReservationId == reservationId).Include(x => x.Passengers).Include(x => x.Flights).ThenInclude(x=>x.OccupiedSeats).FirstOrDefault();
            var flight = await _context.FlightFlightReservation.Where(x => x.ReservationId == reservationId).Include(x => x.Flight).ToListAsync();

            if (reservation == null)
            {
                return new JsonResult("ERROR");
            }

            var passenger = reservation.Passengers.Where(x => !x.AcceptedInvitation && x.FirstName == user.RegisteredUser.FirstName && x.LastName == user.RegisteredUser.LastName).FirstOrDefault();

            if (passenger == null)
            {
                return RedirectToAction("AlreadyDeclined", "Notifications");
            }
            else
            {
                DateTime takeOff = new DateTime(Convert.ToInt32(flight.First().Flight.TakeOffDate.Split('-')[2]), Convert.ToInt32(flight.First().Flight.TakeOffDate.Split('-')[1]),
                        Convert.ToInt32(flight.First().Flight.TakeOffDate.Split('-')[0]));
                takeOff.AddHours(Convert.ToDouble(flight.First().Flight.TakeOffTime.Split(':')[0]));
                takeOff.AddMinutes(Convert.ToDouble(flight.First().Flight.TakeOffTime.Split(':')[1]));

                if ((DateTime.Now - reservation.DateCreated).TotalDays < 3 && (takeOff - DateTime.Now).TotalHours > 3)
                {
                    passenger.AcceptedInvitation = false;
                    var flights = await _context.FlightFlightReservation.Where(x => x.ReservationId == reservation.ReservationId).Include(x => x.Flight).ThenInclude(x => x.OccupiedSeats).ToListAsync();
                    for (int i = 0; i < flights.Count; i++)
                    {
                        
                            var seat = passenger.Seats.ToArray()[i];
                            if (flights.ToArray()[i].Flight.OccupiedSeats.Contains(seat))
                            {
                                flights.ToArray()[i].Flight.OccupiedSeats.Remove(seat);
                            }
                            passenger.Seats.Remove(seat);
                            reservation.Passengers.Remove(passenger);
                       
                        
                    }
                    //user.FlightReservations.Add(reservation);
                    try
                    {
                        await _context.SaveChangesAsync();
                    }
                    catch (Exception)
                    {
                        return BadRequest();
                    }

                    return RedirectToAction("InvitationDeclined", "Notifications");
                }
                else
                {
                    return RedirectToAction("LateConfirm", "Notifications");
                }
            }

            //if (passenger!=null)
            //{
            //    return Redirect("http://localhost:4200//user/reservations/flight-reservations");
            //}

            //var result = await _userManager.ConfirmEmailAsync(user, code);


        }

    }
}
