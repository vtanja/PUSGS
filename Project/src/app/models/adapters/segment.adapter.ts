import { Adapter } from './adapter';
import { Injectable } from '@angular/core';
import { Segment } from '../segment';

@Injectable({
  providedIn:"root"
})
export class SegmentAdapter implements Adapter<Segment>{
  adapt(item: any) {
    console.log('segment adapter ',item);
    return new Segment(item.name, item.rows, item.columns, item.id);
  }

}
