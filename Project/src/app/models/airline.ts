import { Flight } from './flight';

export class Airline {
    id:number;
    name:string;
    address:string;
    description:string;
    rate:number;
    flights:Array<Flight>;
    destinations:Array<string>;
    image:string;

  constructor(id:number,name:string,address:string,description:string,rate:number,
      flights:Array<Flight>,destinations:Array<string>,image:string){

    this.id = id;
    this.name=name;
    this.address=address;
    this.description = description;
    this.rate=rate;
    this.flights=flights;
    this.destinations=destinations;
    this.image = image;
  }
}
