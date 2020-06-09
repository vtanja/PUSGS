import { Flight } from './flight.model';

export class RoundFlight {
    
    toFlight:Flight;
    backFlight:Flight;


  constructor(toFlight:Flight, backFlight:Flight){
    this.toFlight=toFlight;
    this.backFlight = backFlight;
  }
}
