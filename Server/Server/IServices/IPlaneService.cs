using Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.IServices
{
    public interface IPlaneService
    {
        Task<IEnumerable<Plane>> GetPlanesByAirline(int airlineId);
        Task<Plane> GetPlane(string id);
        Task<bool> PostPlane(Plane plane);
        Task<bool> DeletePlane(Plane plane);
        Task<bool> DeletePlaneSegments();
        Task<bool> UpdatePlane(Plane plane);
    }
}
