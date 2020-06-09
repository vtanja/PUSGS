using Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.IRepositories
{
    public interface IPlaneRepository
    {
        Task Save();
        Task<IEnumerable<Plane>> GetPlanesByAirline(int airlineId);
        Task<Plane> GetPlane(string id);
        void PostPlane(Plane plane);
        bool PlaneExists(string id);
        void DeletePlane(Plane plane);
        Task<bool> UpdatePlane(Plane plane);
    }
}
