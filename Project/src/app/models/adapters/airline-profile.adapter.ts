import { Adapter } from './adapter';
import { AddressAdapter } from './address.adapter';
import { Injectable } from '@angular/core';
import { map, groupBy, mergeMap, reduce, toArray } from 'rxjs/operators';
import { Car } from '../Car.model';
import { CarAdapter } from './car.adapter';
import { Office } from '../office';
import { OfficeAdapter } from './office.adapter';
import { DestinationAdapter } from './destination.adapter';
import { Airline } from '../airline.model';
import { Destination } from '../destination.model';
import { DestinationService } from 'src/app/services/destination.service';


@Injectable({
  providedIn : "root"
})
export class AirlineProfileAdapter implements Adapter<Airline>{

  constructor(private addressAdapter:AddressAdapter,private destAdapter:DestinationAdapter){}

  adapt(item:any):Airline{
    let addr = this.addressAdapter.adapt(item.address);
    //let destinations:Destination[] = item.destinations.map(item => this.destAdapter.adapt(item));
    
    let airline = new Airline(item.id,item.name,addr,item.description,[],item.destinations,item.logo);
    return airline;
  }
}
