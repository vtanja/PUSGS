using Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.IRepositories
{
    public interface IReservedDateRepository : IDisposable
    {
        Task<IEnumerable<ReservedDate>> GetCarReservedDates(int carID);
        void AddReservedDate(ReservedDate reservedDate);
        Task<bool> AreDatesReserved(int carId, DateTime pickUpDate, DateTime dropOffDate);
        Task<bool> IsCarReserved(int carID);
        Task Save();
    }
}
