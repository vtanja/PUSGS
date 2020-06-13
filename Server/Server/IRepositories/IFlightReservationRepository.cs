using Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.IRepositories
{
    public interface IFlightReservationRepository
    {
        Task Save();
        void PostFlightReservation(FlightReservation flightReservation);
        bool CheckSeats(FlightReservation flightReservation, List<int> flightIds);
        Task<IEnumerable<FlightReservation>> GetFlightReservations(string userId);
        Task<FlightReservation> GetFlightReservation(int reservationId);
        void UpdateFlightReservation(FlightReservation flightReservation);
        void CancelReservation(FlightReservation reservation);
        bool UpdateReservations();
        Task<Dictionary<string, int>> GetDailyReservationReport(int companyId);
        Task<Dictionary<string, int>> GetRangeReservationReport(int companyId, DateTime startDate, DateTime endDate);
        Task<Dictionary<int, double>> GetMonthlyIncomes(int companyId, int month, int year);
        Task<Dictionary<int, double>> GetAnnualIncomes(int companyId, int year);
    }
}
