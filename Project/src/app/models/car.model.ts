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

  constructor(id:number,brand:string,model:string,year:number,pricePerDay:number,
    avDates:Array<string>,images:Array<string>,maxPassengers:number,
    doors:number,hasAirCondition:boolean,hasAutomaticGearbox:boolean,companyName:string,rate:number){

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
    this.rate = rate;
  }
}
