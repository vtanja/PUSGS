using Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.IRepositories
{
    public interface ICarReservationRepository : IDisposable
    {
        Task<List<CarReservation>> GetUserCarReservation(string userId);
        Task<CarReservation> GetCarReservation(int reservationId);
        Task<IEnumerable<CarReservation>> GetCarReservations(int carId);
        void AddCarReservation(CarReservation reservation);
        void UpdateCarReservation(CarReservation reservation);
        bool CarReservationExists(int id);
        Task<bool> CarReservationExists(DateTime date, int carId);
        Task<Dictionary<string, int>> GetDailyReservationReport(int companyId);
        Task<Dictionary<string, int>> GetRangeReservationReport(int companyId,DateTime startDate,DateTime endDate);
        Task<Dictionary<int, double>> GetMonthlyIncomes(int companyId,int month,int year);
        Task<Dictionary<int, double>> GetAnnualIncomes(int companyId,int year);
        Task Save();
    }
}
