using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models
{
    public class PlaneSegment
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int PlaneSegmentId { get; set; }
        [ForeignKey("PlaneId"), Column(Order = 1)]
        public int PlaneId { get; set; }
        [ForeignKey("SegmentId"), Column(Order = 2)]
        public int SegmentId { get; set; }
        public virtual Plane Plane { get; set; }
        public virtual Segment Segment { get; set; }
    }
}
