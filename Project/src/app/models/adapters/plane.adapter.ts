import { Adapter } from './adapter';
import { Injectable } from '@angular/core';
import { Plane } from '../plane';
import { Segment } from '../segment';
import { SegmentAdapter } from './segment.adapter';

@Injectable({
  providedIn:"root"
})
export class PlaneAdapter implements Adapter<Plane>{
    constructor(private segmentAdapter:SegmentAdapter){}

  adapt(item: any) {
      console.log('plane adapter ',item);
    return new Plane(item.code, item.segments, item.airlineId);
  }

}
