import { Adapter } from './adapter';
import { Injectable } from '@angular/core';
import { Airline } from '../airline.model';
import { AddressAdapter } from './address.adapter';
import { Destination } from '../destination.model';
import { DestinationAdapter } from './destination.adapter';


@Injectable({
  providedIn : "root"
})
export class AirlineAdapter implements Adapter<Airline>{

  constructor(private addressAdapter:AddressAdapter, private destAdapter:DestinationAdapter){}

  adapt(item:any):Airline{
    let addr = this.addressAdapter.adapt(item.address);
    return new Airline(item.id,item.name,addr,item.description,null,null,item.logo)
  }
}
