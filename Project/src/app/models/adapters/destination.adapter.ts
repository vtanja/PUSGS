import { Adapter } from './adapter';
import { Office } from '../office';
import { Injectable } from '@angular/core';
import { Destination } from '../destination.model';

@Injectable({
  providedIn:"root"
})
export class DestinationAdapter implements Adapter<Destination>{
  adapt(item: any) {
    return new Destination(item.destinationId,item.city,item.country);
  }

}
