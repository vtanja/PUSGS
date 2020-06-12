import { Adapter } from './adapter';
import { Injectable } from '@angular/core';
import { Airline } from '../airline.model';
import { AddressAdapter } from './address.adapter';
import { Destination } from '../destination.model';
import { DestinationAdapter } from './destination.adapter';
import { PlaneAdapter } from './plane.adapter';
import { UserAdapter } from './user.adapter';


@Injectable({
  providedIn : "root"
})
export class AirlineAdapter implements Adapter<Airline>{

  constructor(private addressAdapter:AddressAdapter, private planeAdapter:PlaneAdapter, private userAdapter:UserAdapter){}

  adapt(item:any):Airline{
    console.log('airline adapter: ', item);
    let addr = this.addressAdapter.adapt(item.address);
    let planes=[]
     item.planes.forEach(element => {
        planes.push(this.planeAdapter.adapt(element))    
     });
   let airline = new Airline(item.id,item.name,addr,item.description,null,item.destinations,item.logo)
   airline.planes=planes;
   airline.owner= this.userAdapter.adapt(item.owner);
   console.log(airline);
   return airline;
  }
}
