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
        private readonly AirlineAdminService airlineAdminService;
        private readonly CarReservationService carReservationService;
        private readonly Email.IEmailSender _emailSender;

        public FlightReservationsController(DataBaseContext context, UnitOfWork unitOfWork, Email.IEmailSender emailSender)
        {
            _context = context;
            flightReservationService = unitOfWork.FlightReservationService;
            airlineAdminService = unitOfWork.AirlineAdminService;
            carReservationService = unitOfWork.CarReservationService;
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

        [HttpPut("Update")]
        public async Task<IActionResult> UpdateReservations(FlightReservation flightReservation)
        {
            
            if(!await flightReservationService.UpdateReservations())
            {
                return BadRequest(new { message = "Error while updating flight reservations!" });
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

            var userRes = await _context.UserFlightReservations.Include(x => x.Reservation).ThenInclude(x => x.Flights).Where(x => x.UserId == userId && !x.Reservation.Cancelled).ToListAsync();
            foreach (var item in userRes)
            {
                var flights = await _context.FlightFlightReservation.Include(x=>x.Flight).Where(x => x.ReservationId == item.ReservationId).ToListAsync();
                foreach (var item2 in flights)
                {
                    if (flightReservation.FlightsIds.Contains(item2.FlightId))
                    {
                        return BadRequest(new { message = "User has already made a reservation on this flight! " });
                    }
                }
            }

            FlightReservation fr = new FlightReservation()
            {
                Cancelled = flightReservation.Cancelled,
                FlightRated = flightReservation.FlightRated,
                AirlineRated = flightReservation.AirlineRated,
                Passengers = flightReservation.Passengers,
                TotalPrice = flightReservation.TotalPrice,
                DateCreated = DateTime.Now,
                
            };

            //ako postoji carReservation upisem je
            // result ako je dodata rezervacija je success_idRez
            //i onda ovo na null da se ne bi dva puta dodala rezervacija
            if (flightReservation.CarReservation != null)
            {
                flightReservation.CarReservation.UserId = userId;
                string result = await carReservationService.AddQuickReservation(flightReservation.CarReservation);
                if (result.Contains("success"))
                {
                    int reservationId = Int32.Parse(result.Split('_')[1]);
                    fr.CarReservationId = reservationId;
                }
            }



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
                    int i = 0;
                    var flight = await _context.Flights.Where(x => x.Id == item).Include(x => x.LandingLocation).Include(x => x.TakeOffLocation).FirstAsync();
                    if (flight != null)
                    {
                        //fr.Flights.Add(flight);
                        FlightFlightReservation reservation = new FlightFlightReservation();
                        reservation.Flight = flight;
                        reservation.FlightPrice = flightReservation.FlightPrice[i];
                        reservation.FlightId = flight.Id;
                        reservation.Reservation = fr;
                        reservation.ReservationId = fr.ReservationId;
                        _context.FlightFlightReservation.Add(reservation);
                    }
                    i++;
                }


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
                //message += "\n\n\tRent car company: " + flightReservation.CarReservation.Car.CarCompany.Name;
            }
            message += "\nTotal price: " + flightReservation.TotalPrice;

            await _emailSender.SendEmailAsync(email, "Travellix - Reservation details", message);
        }

        // DELETE: api/FlightReservations/5
        [HttpDelete("{id}")]
        [Authorize("USER")]
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
        [Authorize("USER")]
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
        [Authorize("USER")]
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

        }

        //GET: api/CarReservations/Daily
        [HttpGet]
        [Route("Daily")]
        [Authorize(Roles = "AIRLINEADMIN")]
        public async Task<ActionResult<CarReservation>> GetDailyCarReservation()
        {
            string userId = User.Claims.First(c => c.Type == "UserID").Value;
            var admin = await airlineAdminService.GetAirlineAdmin(userId);

            if (admin.Airline == null)
                return BadRequest();

            var flightReservation = await flightReservationService.GetDailyReservationReport((int)admin.AirlineId);

            if (flightReservation == null)
            {
                return NotFound();
            }

            return Ok(flightReservation);
        }

        [HttpGet]
        [Route("MonthlyIncomes/{date}")]
        [Authorize(Roles = "AIRLINEADMIN")]
        public async Task<ActionResult<CarReservation>> GetMonthlyIncomes(string date)
        {
            string userId = User.Claims.First(c => c.Type == "UserID").Value;
            var admin = await airlineAdminService.GetAirlineAdmin(userId);

            if (admin.AirlineId == null)
                return BadRequest();

            string[] parts = date.Split(':');
            if (parts.Count() == 0)
                return BadRequest();

            int month;
            int year;
            if (Int32.TryParse(parts[0], out month) && Int32.TryParse(parts[1], out year))
            {
                var flightReservation = await flightReservationService.GetMonthlyIncomes((int)admin.AirlineId, year, month);

                if (flightReservation == null)
                {
                    return NotFound();
                }

                return Ok(flightReservation);

            }

            return BadRequest();
        }

        [HttpGet]
        [Route("AnnualIncomes/{year}")]
        [Authorize(Roles = "AIRLINEADMIN")]
        public async Task<ActionResult<CarReservation>> GetAnnualIncomes(int year)
        {
            string userId = User.Claims.First(c => c.Type == "UserID").Value;
            var admin = await airlineAdminService.GetAirlineAdmin(userId);

            if (admin.AirlineId == null)
                return BadRequest();

            var flightReservation = await flightReservationService.GetAnnualIncomes((int)admin.AirlineId, year);

            if (flightReservation == null)
            {
                return NotFound();
            }

            return Ok(flightReservation);
        }

        [HttpGet]
        [Route("Weekly")]
        [Authorize(Roles = "AIRLINEADMIN")]
        public async Task<ActionResult<CarReservation>> GetWeeklyReservation()
        {
            string userId = User.Claims.First(c => c.Type == "UserID").Value;
            var admin = await airlineAdminService.GetAirlineAdmin(userId);

            if (admin.AirlineId == null)
                return BadRequest();

            var flightReservation = await flightReservationService.GetWeeklyReservationReport((int)admin.AirlineId);

            if (flightReservation == null)
            {
                return NotFound();
            }

            return Ok(flightReservation);
        }

        [HttpGet]
        [Route("Monthly")]
        [Authorize(Roles = "AIRLINEADMIN")]
        public async Task<ActionResult<CarReservation>> GetMonthlyCarReservation()
        {
            string userId = User.Claims.First(c => c.Type == "UserID").Value;
            var admin = await airlineAdminService.GetAirlineAdmin(userId);

            if (admin.AirlineId == null)
                return BadRequest();

            var flightReservation = await flightReservationService.GetMonthlyReservationReport((int)admin.AirlineId);

            if (flightReservation == null)
            {
                return NotFound();
            }

            return Ok(flightReservation);
        }


    }
}
