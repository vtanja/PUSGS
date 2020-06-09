using Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.IServices
{
    public interface ISegmentService
    {
        Task<IEnumerable<Segment>> GetSegments();
        Task<Segment> GetSegment(int id);
        Task<bool> PutSegment(Segment segment);
        Task<bool> PostSegment(Segment segment);
        Task<bool> DeleteSegment(Segment segment);
    }
}
