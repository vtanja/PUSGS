using Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.IRepositories
{
    public interface ICarReservationRepository : IDisposable
    {
        Task<IEnumerable<CarReservation>> GetUserCarReservation(string userId);
        void AddCarReservation(CarReservation reservation);
        bool CarReservationExists(int id);
        Task<bool> CarReservationExists(DateTime date, int carId);
        Task<Dictionary<string, int>> GetDailyReservationReport(int companyId);
        Task<Dictionary<string, int>> GetRangeReservationReport(int companyId,DateTime startDate,DateTime endDate);
        Task Save();
    }
}
