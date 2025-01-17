﻿using Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.IServices
{
    public interface IFlightReservationService
    {
        Task<bool> PostFlightReservation(FlightReservation flightReservation, List<int> flightIds);
        Task<IEnumerable<FlightReservation>> GetFlightReservations(string userId);
        Task<bool> CancelReservation(FlightReservation reservation);
        Task<bool> UpdateReservations();

        Task<string> GetDailyReservationReport(int companyId);
        Task<string> GetWeeklyReservationReport(int companyId);
        Task<string> GetMonthlyReservationReport(int companyId);
        Task<string> GetMonthlyIncomes(int companyId, int year, int month);
        Task<string> GetAnnualIncomes(int companyId, int year);
    }
}
