import { Flight } from './flight.model';
import { Address } from './address';
import { UsersRate } from './users-rate.model';
import { Plane } from './plane';

export class Airline {
    id:number;
    name:string;
    address:Address;
    description:string;
    rate:number;
    flights:Array<Flight>;
    destinations:{};
    image:string;
    rates:UsersRate[];
    private city:string;
    planes:Plane[];

  constructor(id:number,name:string,address:Address,description:string,
      flights:Array<Flight>,destinations:{},image:string){

    this.id = id;
    this.name=name;
    this.address=address;
    this.description = description;
    this.rate=-1;
    this.flights=flights;
    this.destinations=destinations;
    this.image = image;
    this.city=address.city;
    this.rates=[];
    this.planes=[];
  }


  getAddress():string{
    return this.address.toString();
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
