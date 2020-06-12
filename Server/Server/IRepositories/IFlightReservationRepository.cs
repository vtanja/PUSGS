﻿using Server.Models;
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
        void CancelReservation(FlightReservation reservation);
    }
}
