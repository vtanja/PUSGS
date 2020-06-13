import { Adapter } from './adapter';
import { Injectable } from '@angular/core';
import { Plane } from '../plane';
import { Segment } from '../segment';
import { SegmentAdapter } from './segment.adapter';
import { AirlineAdapter } from './airline.adapter';
import { AirlineService } from 'src/app/services/airline.service';

@Injectable({
  providedIn:"root"
})
export class PlaneAdapter implements Adapter<Plane>{
    constructor(private segmentAdapter:SegmentAdapter, private airlineAdapter:AirlineAdapter, private airlineService:AirlineService){}

  adapt(item: any) {
      console.log('plane adapter ',item);
    let plane = new Plane(item.code, item.segments, item.airlineId);
    console.log('plane adapter: ', plane);
    this.airlineService.getAirline(item.airlineId).subscribe((res:any)=>{
      plane.airlineName = res.name;
    });
    return plane;
  }

}
