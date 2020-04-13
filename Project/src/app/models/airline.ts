import { Flight } from './flight';
import { Address } from './address';

export class Airline {
    id:number;
    name:string;
    address:Address;
    description:string;
    rate:number;
    flights:Array<Flight>;
    destinations:{};
    image:string;
    private city:string;

  constructor(id:number,name:string,address:Address,description:string,rate:number,
      flights:Array<Flight>,destinations:{},image:string){

    this.id = id;
    this.name=name;
    this.address=address;
    this.description = description;
    this.rate=rate;
    this.flights=flights;
    this.destinations=destinations;
    this.image = image;
    this.city=address.city;
  }


  getAddress():string{
    return this.address.toString();
  }
}
