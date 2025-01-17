import { Car } from '../Car.model';
import { Adapter } from './adapter';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn:"root"
})
export class CarAdapter implements Adapter<Car>{
  adapt(item:any):Car{
    return new Car(item.id,item.brand,item.model,item.year,item.price,
                    item.image,item.passengersNumber,item.doors,item.hasAirCondition,item.hasAutomationGearbox,item.companyName,item.companyId,item.rate);
  }
}
