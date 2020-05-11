import { CarReservation } from './carReservation.model';
import { UsersRate } from './users-rate.model';
import { Discount } from './discount.model';

export class Car{

  id:number;
  brand:string;
  model:string;
  year:number;
  pricePerDay:number;
  availableDates:Array<string>;
  images: Array<string>;
  maxPassengers:number;
  doors:number;
  hasAirCondition:boolean;
  hasAutomaticGearbox:boolean;
  companyName:string;
  rate:number;
  rates:UsersRate[];
  reservations:CarReservation[];
  discounts:Discount[];


  constructor(id:number,brand:string,model:string,year:number,pricePerDay:number,
    avDates:Array<string>,images:Array<string>,maxPassengers:number,
    doors:number,hasAirCondition:boolean,hasAutomaticGearbox:boolean,companyName:string){

    this.id=id;
    this.brand=brand;
    this.model=model;
    this.year=year;
    this.pricePerDay = pricePerDay;
    this.availableDates = avDates;
    this.images = images;
    this.maxPassengers = maxPassengers;
    this.doors = doors;
    this.doors=doors;
    this.hasAirCondition=hasAirCondition;
    this.hasAutomaticGearbox=hasAutomaticGearbox;
    this.companyName=companyName;
    this.rate = -1;
    this.rates=[];
    this.discounts = [];
    this.reservations=[];
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

