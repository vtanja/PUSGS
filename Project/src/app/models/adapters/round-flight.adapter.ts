import { Injectable } from '@angular/core';
import { Flight } from '../flight.model';
import { Adapter } from './adapter';
import { PlaneAdapter } from './plane.adapter';
import { RoundFlight } from '../round-flight.model';
import { FlightAdapter } from './flight.adapter';

@Injectable({
    providedIn:"root"
  })
  export class RoundFlightAdapter implements Adapter<RoundFlight>{
    constructor(private flightAdapter:FlightAdapter){}

    adapt(item: any) {
        console.log('round flight adapter: ', item);
        let toflight = this.flightAdapter.adapt(item.item1);
        let backflight = this.flightAdapter.adapt(item.item2);
      return new RoundFlight(toflight, backflight);
    }
  
  }
  