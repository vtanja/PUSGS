using Server.IServices;
using Server.Models;
using Server.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Services
{
    public class SegmentService:ISegmentService
    {
        SegmentRepository segmentRepository;

        public SegmentService(SegmentRepository segmentRepository)
        {
            this.segmentRepository = segmentRepository;
        }

        public async Task<bool> DeleteSegment(Segment segment)
        {
            segmentRepository.DeleteSegment(segment);
            try
            {
                await segmentRepository.Save();
            }
            catch
            {
                return false;
            }
            return true;
        }

        public async Task<Segment> GetSegment(int id)
        {
            return await segmentRepository.GetSegment(id);
        }

        public async Task<IEnumerable<Segment>> GetSegments()
        {
            return await segmentRepository.GetSegments();
        }

        public async Task<bool> PostSegment(Segment segment)
        {
            segmentRepository.PostSegment(segment);
            try
            {
                await segmentRepository.Save();
            }
            catch
            {
                return false;
            }
            return true;
        }

        public async Task<bool> PutSegment(Segment segment)
        {
            segmentRepository.PutSegment(segment);
            try
            {
                await segmentRepository.Save();
            }
            catch
            {
                return false;
            }
            return true;
        }
    }
}
