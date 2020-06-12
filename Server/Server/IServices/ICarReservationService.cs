using Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.IServices
{
    public interface ICarReservationService 
    {
        Task<List<CarReservation>> GetUserCarReservations(string userId);
        Task<string> AddReservation(CarReservation carReservation);
        Task<string> AddQuickReservation(CarReservation carReservation);
        Task<string> GetDailyReservationReport(int companyId);
        Task<string> GetWeeklyReservationReport(int companyId);
        Task<string> GetMonthlyReservationReport(int companyId);
        Task<string> GetMonthlyIncomes(int companyId,int year,int month);
        Task<string> GetAnnualIncomes(int companyId,int year);
    }
}
