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
  image: string;
  maxPassengers:number;
  doors:number;
  hasAirCondition:boolean;
  hasAutomaticGearbox:boolean;
  companyName:string;
  companyId:number;
  rate:number;
  rates:UsersRate[];
  reservations:CarReservation[];
  discounts:Discount[];


  constructor(id:number,brand:string,model:string,year:number,pricePerDay:number,
    avDates:Array<string>,image:string,maxPassengers:number,
    doors:number,hasAirCondition:boolean,hasAutomaticGearbox:boolean,companyName:string,companyId:number){

    this.id=id;
    this.brand=brand;
    this.model=model;
    this.year=year;
    this.pricePerDay = pricePerDay;
    this.availableDates = avDates;
    this.image = image;
    this.maxPassengers = maxPassengers;
    this.doors = doors;
    this.doors=doors;
    this.hasAirCondition=hasAirCondition;
    this.hasAutomaticGearbox=hasAutomaticGearbox;
    this.companyName=companyName;
    this.companyId=companyId;
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

