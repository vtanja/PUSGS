import { Car } from './Car.model';
import { Address } from './address';

export class RentCar{

  id:number;
  name:string;
  address:Address;
  description:string;
  rate:number;
  cars:Array<Car>;
  offices:{};
  logo:string;
  private city:string;

  constructor(id:number,name:string,address:Address,description:string,rate:number,cars:Array<Car>,offices:{},logo:string){

    this.id = id;
    this.name=name;
    this.address=address;
    this.description = description;
    this.rate=rate;
    this.cars=cars;
    this.offices=offices;
    this.logo = logo;
    this.city=this.address.city;
  }

  getAddress():string{
    return this.address.toString();
  }
}
