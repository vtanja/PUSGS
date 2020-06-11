using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
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
            var user = await _context.Users.Include(x => x.RegisteredUser).Where(x => x.UserId == userId).FirstOrDefaultAsync();

            FlightReservation fr = new FlightReservation()
            {
                User = user,
                UserId = user.UserId,
                CarReservation = flightReservation.CarReservation,
                Cancelled = flightReservation.Cancelled,
                FlightRated = flightReservation.FlightRated,
                AirlineRated = flightReservation.AirlineRated,
                Passengers = flightReservation.Passengers,
                TotalPrice = flightReservation.TotalPrice
            };

            

            foreach (var item in flightReservation.FlightsIds)
            {
                var flight = await _context.Flights.Where(x => x.Id == item).Include(x=>x.LandingLocation).Include(x=>x.TakeOffLocation).FirstAsync();
                if(flight != null)
                {
                    fr.Flights.Add(flight);
                }
            }

            
            if (await flightReservationService.PostFlightReservation(fr))
            {
                if (flightReservation.CarReservation != null)
                {
                    fr.CarReservationId = flightReservation.CarReservation.Id;
                }

                SendConfirmationMail(user, fr);
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
            var confirmationLink = Url.Action(nameof(ConfirmFlightReservation), "User", new { UserId = user.UserId, ReservationId = flightReservation.ReservationId }, protocol: HttpContext.Request.Scheme);

            var message = "You have one new invitation to travel with your friend: " + user.RegisteredUser.FirstName + " " + user.RegisteredUser.LastName + ".";
            message += "\n Flight info: ";
            message += "\nFrom: " + flightReservation.Flights.First().TakeOffLocation.Location + ", " + flightReservation.Flights.First().TakeOffDate + " at " + flightReservation.Flights.First().TakeOffTime;
            message += "\nTo: " + flightReservation.Flights.First().LandingLocation.Location + ", " + flightReservation.Flights.First().LandingDate + " at " + flightReservation.Flights.First().LandingTime;
            if (flightReservation.CarReservation == null)
            {
                message += "\nCar is not included.";
            }
            else
            {
                message += "\n Car is also included.";
            }
            message += "\nPrice: " + flightReservation.TotalPrice;
            message += "\n\n Please confirm invitation by clicking on this link: <a href=\"" + confirmationLink + "\">click here.</a>";
            var passengers = flightReservation.Passengers.Where(x => x.SendInvitation == true);
            foreach (var item in passengers)
            {
                var passenger = await _context.Users.Include(x => x.RegisteredUser).Where(x => x.RegisteredUser.FirstName == item.FirstName && x.RegisteredUser.LastName == item.LastName).FirstOrDefaultAsync();
                await _emailSender.SendEmailAsync(passenger.RegisteredUser.Email, "Travellix - Invitation", message);
            }
        }

        private async void SendReservationDetail(string email, FlightReservation flightReservation)
        {
            var userMessage = "Thank you for your reservation. Here are reservation details: ";
            userMessage += "\n Flight info: ";
            userMessage += "\nFrom: " + flightReservation.Flights.First().TakeOffLocation.Location + ", " + flightReservation.Flights.First().TakeOffDate + " at " + flightReservation.Flights.First().TakeOffTime;
            userMessage += "\nTo: " + flightReservation.Flights.First().LandingLocation.Location + ", " + flightReservation.Flights.First().LandingDate + " at " + flightReservation.Flights.First().LandingTime;
            if (flightReservation.CarReservation == null)
            {
                userMessage += "\nCar is not included.";
            }
            else
            {
                userMessage += "\n Car is also included.";
                userMessage += "\n\n\tCar reservation details: ";
                userMessage += "\n\n\tCar model: " + flightReservation.CarReservation.Car.Model;
                userMessage += "\n\n\tPick up date: " + flightReservation.CarReservation.PickUpDate;
                userMessage += "\n\n\tDrop off date: " + flightReservation.CarReservation.DropOffDate;
                userMessage += "\n\n\tRent car company: " + flightReservation.CarReservation.Car.CarCompany.Name;
            }
            userMessage += "\nTotal price: " + flightReservation.TotalPrice;

            await _emailSender.SendEmailAsync(email, "Travellix - Reservation details", userMessage);
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
        public async Task<IActionResult> ConfirmFlightReservation(string userID, int reservationId)
        {
            if (string.IsNullOrWhiteSpace(userID) || reservationId==null)
            {
                ModelState.AddModelError("", "User ID and code are required");
                return BadRequest(ModelState);
            }

            var user = await _context.Users.Include(x=>x.RegisteredUser).Where(x=>x.UserId == userID).FirstOrDefaultAsync();
            var reservation = user.FlightReservations.Where(x => x.ReservationId == reservationId).FirstOrDefault();
            if (user == null || reservation==null)
            {
                return new JsonResult("ERROR");
            }

            var passenger = reservation.Passengers.Where(x => x.FirstName == user.RegisteredUser.FirstName && x.LastName == user.RegisteredUser.LastName && x.AcceptedInvitation).FirstOrDefault();
            if (passenger!=null)
            {
                return Redirect("http://localhost:4200//user/reservations/flight-reservations");
            }

            //var result = await _userManager.ConfirmEmailAsync(user, code);
            passenger.AcceptedInvitation = true;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception)
            {
                return BadRequest();
            }

            return RedirectToAction("ReservationConfirmed", "Notifications", new { userID, reservationId });

        }

    }
}
