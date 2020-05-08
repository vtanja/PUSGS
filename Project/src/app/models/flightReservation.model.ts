import { CarReservation } from './carReservation.model';

interface Passenger {
  seat: number;
  passenger: {firstname:string, lastname:string, passportNo:string};
}

export class FlightReservation{
  code:string;
  flightID:number;
  companyID:number;
  price:number;
  passengers:Passenger[];
  carReservation:CarReservation[];
  airlineRated:boolean;
  flightRated:boolean;

  constructor(code:string, flightID:number, companyID:number, price:number, passengers:Passenger[]){
    this.code=code;
    this.flightID=flightID;
    this.companyID= companyID;
    this.price = price;
    this.carReservation=[];
    this.passengers=passengers;
    this.flightRated=false;
    this.airlineRated=false;
  }
}
