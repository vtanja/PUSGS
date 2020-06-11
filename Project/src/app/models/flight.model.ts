import { UsersRate } from './users-rate.model';
import { Airport } from './airport';
import { Airline } from './airline.model';
import { Plane } from './plane';
import { Segment } from './segment';
import { Seat } from './seat.model';

export class Flight {
    id:number;
    takeOffLocation:Airport;
    landingLocation:Airport;
    takeOffDate:string;
    landingDate:string;
    takeOffTime:string;
    landingTime:string;
    duration:number;
    connections:Airport[]
    segmentPrices:{segment:Segment, price:number}[];
    //image:string;
    planename:string;
    planeId:string;
    plane:Plane;
    occupiedSeats:Seat[];


  constructor(id:number, takeOffLocation:Airport, landingLocation:Airport, takeOffDate:string,landingDate:string,
                takeOffTime:string,landingTime:string, duration:number,changeoverLocations:Airport[],
                  price:{segment:Segment, price:number}[], planeId:string){

    this.id = id;
    this.takeOffLocation=takeOffLocation;
    this.landingLocation=landingLocation;
    this.takeOffDate=takeOffDate;
    this.landingDate=landingDate;
    this.takeOffTime=takeOffTime;
    this.landingTime=landingTime;
    this.duration=duration;
    this.connections=changeoverLocations;
    this.segmentPrices=price;
    //this.rate=-1;
    //this.rates=[];
    this.planeId=planeId;
    this.occupiedSeats = [];
  }

//   updateRate():void{

//     var ret =0;
//     var i= 0
//     this.rates.forEach(element => {

//       ret+=element.rate;
//       ++i;

//     });
//     this.rate=+(ret/i).toFixed(1);

// }

// addRate(rate:UsersRate){
//   this.rates.push(rate);
//   this.updateRate();
// }
}
