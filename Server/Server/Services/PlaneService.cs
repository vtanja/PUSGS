using Server.IRepositories;
using Server.IServices;
using Server.Models;
using Server.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Services
{
    public class PlaneService:IPlaneService
    {
        private PlaneRepository planeRepository;
        private SegmentRepository segmentRepository;

        public PlaneService(PlaneRepository planeRepository, SegmentRepository segmentRepository)
        {
            this.planeRepository = planeRepository;
            this.segmentRepository = segmentRepository;
        }

        public async Task<bool> DeletePlane(Plane plane)
        {
            if (plane.OccupiedDates.Count == 0)
            {
                planeRepository.DeletePlane(plane);
                try
                {
                    await planeRepository.Save();
                }
                catch (Exception)
                {
                    return false;
                }
                return true;
            }
            else
            {
                return false;
            }
           
        }

        public async Task<bool> DeletePlaneSegments()
        {
            segmentRepository.DeletePlaneSegments();
            try
            {
                await segmentRepository.Save();
            }
            catch (Exception)
            {
                return false;
            }
            return true;
        }

        public async Task<Plane> GetPlane(string id)
        {
            return await planeRepository.GetPlane(id);
        }

        public async Task<IEnumerable<Plane>> GetPlanesByAirline(int airlineId)
        {
            return await planeRepository.GetPlanesByAirline(airlineId);
        }

        public async Task<bool> PostPlane(Plane plane)
        {
            planeRepository.PostPlane(plane);
            try
            {
                await planeRepository.Save();
            }
            catch (Exception)
            {
                return false;
            }
            return true;
        }

        public async Task<bool> UpdatePlane(Plane plane)
        {
            if(await planeRepository.UpdatePlane(plane))
            {
                try
                {
                    await planeRepository.Save();
                }
                catch (Exception)
                {
                    return false;
                }
                return true;
            }
            return false;
        }
    }
}
