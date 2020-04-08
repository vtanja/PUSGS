import { Car } from './Car.model';

export class RentCar{

  id:number;
  name:string;
  address:string;
  description:string;
  rate:number;
  cars:Array<Car>;
  offices:Array<string>;
  images:Array<string>;

  constructor(id:number,name:string,address:string,description:string,rate:number,cars:Array<Car>,offices:Array<string>,images:Array<string>){

    this.id = id;
    this.name=name;
    this.address=address;
    this.description = description;
    this.rate=rate;
    this.cars=cars;
    this.offices=offices;
    this.images = images;
  }
}
