import { Adapter } from './adapter';
import { RentCar } from '../rent-a-car.model';
import { AddressAdapter } from './address.adapter';
import { Injectable } from '@angular/core';
import { map, groupBy, mergeMap, reduce, toArray } from 'rxjs/operators';
import { Car } from '../Car.model';
import { CarAdapter } from './car.adapter';
import { Office } from '../office';
import { OfficeAdapter } from './office.adapter';


@Injectable({
  providedIn : "root"
})
export class RentCarProfileAdapter implements Adapter<RentCar>{

  constructor(private addressAdapter:AddressAdapter,private carAdapter:CarAdapter,private officeAdapter:OfficeAdapter){}

  adapt(item:any):RentCar{
    let addr = this.addressAdapter.adapt(item.address);
    let cars:Car[] = item.cars.map(item => this.carAdapter.adapt(item));
    let rc = new RentCar(item.id,item.name,addr,item.description,cars,item.offices,item.logo);
    console.log(rc);
    return rc;
  }
}
