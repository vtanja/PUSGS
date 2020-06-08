import { Injectable } from '@angular/core';
import { Flight } from '../flight.model';
import { Adapter } from './adapter';
import { PlaneAdapter } from './plane.adapter';

@Injectable({
    providedIn:"root"
  })
  export class FlightAdapter implements Adapter<Flight>{
    constructor(private planeAdapter:PlaneAdapter){}

    adapt(item: any) {
      let flight = new Flight(item.id, item.takeOffLocation,item.landingLocation,item.takeOffDate, item.landingDate, item.takeOffTime, item.landingTime, item.duration, item.connections, item.segmentPrices, item.plane.code);
      flight.plane = this.planeAdapter.adapt(item.plane);
      console.log(flight);
      return flight;
    }
  
  }
  