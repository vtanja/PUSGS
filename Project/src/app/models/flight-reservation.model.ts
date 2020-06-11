import { CarReservation } from './car-reservation.model';
import { Passenger } from './passenger.model';
import { Flight } from './flight.model';

export class FlightReservation{
   reservationId :number;
   totalPrice :number;
   canRate: boolean;
   flightRated :boolean;
   airlineRated :boolean;
   cancelled :boolean;
   carReservation :CarReservation ;
   passengers: Passenger[];
   flights:Flight[];
   flightsIds:number[]=[];

  constructor(){
    this.passengers =[];
    this.cancelled=false;
    this.airlineRated=false;
    this.flightRated=false;
    this.flights = [];
  }
}
