import { CarReservation } from './car-reservation.model';
import { UsersRate } from './users-rate.model';
import { Discount } from './discount.model';
import { RentCar } from './rent-a-car.model';

export class Car{

  id:number;
  brand:string;
  model:string;
  year:number;
  price:number;
  availableDates:Array<string>;
  image: string;
  passengersNumber:number;
  doors:number;
  hasAirCondition:boolean;
  hasAutomationGearbox:boolean;
  companyName:string;
  companyId:number;
  rate:number;
  rates:UsersRate[];
  reservations:CarReservation[];
  discounts:Discount[];
  carCompany:RentCar;

  constructor(id:number,brand:string,model:string,year:number,pricePerDay:number,image:string,maxPassengers:number,
    doors:number,hasAirCondition:boolean,hasAutomaticGearbox:boolean,companyName:string,companyId:number){

    this.id=id;
    this.brand=brand;
    this.model=model;
    this.year=year;
    this.price = pricePerDay;
    this.image = image;
    this.passengersNumber = maxPassengers;
    this.doors=doors;
    this.hasAirCondition=hasAirCondition;
    this.hasAutomationGearbox=hasAutomaticGearbox;
    this.companyName=companyName;
    this.companyId=companyId;
    this.rate = -1;
  }


}

