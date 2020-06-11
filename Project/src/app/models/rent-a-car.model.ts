import { Car } from './Car.model';
import { Address } from './address';
import { UsersRate } from './users-rate.model';

export class RentCar{

  id:number;
  name:string;
  address:Address;
  description:string;
  cars:Array<Car>;
  offices:{};
  logo:string;
  private city:string;
  rates:UsersRate[];
  rate:number;

  constructor(id:number,name:string,address:Address,description:string,cars:Array<Car>,offices:{},logo:string,rate:number){

    this.id = id;
    this.name=name;
    this.address=address;
    this.description = description;
    this.cars=cars;
    this.offices=offices;
    this.logo = logo;
    this.city=this.address.city;
    this.rates=[];
    this.rate=rate;
  }

  getAddress():string{
    return this.address.toString();
  }


  getOfficesAddresses():Address[]{
    console.log(this.offices);
    let keys = Object.keys(this.offices);
    let ret:Address[] = [];
    keys.forEach(country=>{
      this.offices[country].forEach(address => {
      ret.push(address);
      });
    });
    return ret;
  }
}
