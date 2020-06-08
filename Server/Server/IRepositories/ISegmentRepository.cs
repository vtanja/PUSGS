using Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.IRepositories
{
    public interface ISegmentRepository
    {
        Task Save();
        bool SegmentExists(int id);
        Task<IEnumerable<Segment>> GetSegments();
        Task<Segment> GetSegment(int id);
        void PutSegment(Segment segment);
        void PostSegment(Segment segment);
        void DeleteSegment(Segment segment);

        void DeletePlaneSegments();
    }
}
