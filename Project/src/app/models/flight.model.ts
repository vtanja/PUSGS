import { UsersRate } from './users-rate.model';
import { Airport } from './airport';
import { Airline } from './airline.model';

export class Flight {
    id:number;
    takeOffLocation:Airport;
    landingLocation:Airport;
    takeOffDate:string;
    landingDate:string;
    takeOffTime:string;
    landingTime:string;
    duration:number;
    numberOfChangeovers:number;
    changeoverLocations:Array<string>;
    price:number;
    rate:number;
    image:string;
    freeSeats:number[];
    economySeats:number;
    premiumEconomySeats:number;
    businessSeats:number;
    firstClassSeats:number;
    airline:Airline;
    rates:UsersRate[];
    planename:string;


  constructor(id:number,takeOffLocation:Airport, landingLocation:Airport, takeOffDate:string,landingDate:string,
                takeOffTime:string,landingTime:string, duration:number, numberOfChangeovers:number,changeoverLocations:Array<string>,
                  price:number, economySeats:number, premiumEconomySeats:number,businessSeats:number,
                  firstClassSeats:number){

    this.id = id;
    this.takeOffLocation=takeOffLocation;
    this.landingLocation=landingLocation;
    this.takeOffDate=takeOffDate;
    this.landingDate=landingDate;
    this.takeOffTime=takeOffTime;
    this.landingTime=landingTime;
    this.duration=duration;
    this.numberOfChangeovers=numberOfChangeovers;
    this.changeoverLocations=changeoverLocations;
    this.price=price;
    this.rate=-1;
    this.economySeats=economySeats;
    this.premiumEconomySeats=premiumEconomySeats;
    this.businessSeats=businessSeats;
    this.firstClassSeats=firstClassSeats;
    this.rates=[];

  }

  updateRate():void{

    var ret =0;
    var i= 0
    this.rates.forEach(element => {

      ret+=element.rate;
      ++i;

    });
    this.rate=+(ret/i).toFixed(1);

}

addRate(rate:UsersRate){
  this.rates.push(rate);
  this.updateRate();
}
}
