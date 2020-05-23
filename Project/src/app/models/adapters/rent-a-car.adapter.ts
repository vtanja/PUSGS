import { Adapter } from './adapter';
import { RentCar } from '../rent-a-car.model';
import { AddressAdapter } from './address.adapter';
import { Injectable } from '@angular/core';
import { map, groupBy } from 'rxjs/operators';
import { Car } from '../Car.model';
import { CarAdapter } from './car.adapter';


@Injectable({
  providedIn : "root"
})
export class RentCarAdapter implements Adapter<RentCar>{

  constructor(private addressAdapter:AddressAdapter,private carAdapter:CarAdapter){}

  adapt(item:any):RentCar{
    let addr = this.addressAdapter.adapt(item.address);
    return new RentCar(item.id,item.name,addr,item.description,null,null,item.logo)
  }
}
