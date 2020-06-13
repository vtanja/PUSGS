import { Injectable } from '@angular/core';
import { Adapter } from './adapter';
import { CarReservation } from '../car-reservation.model';

@Injectable({
  providedIn:"root"
})
export class CarReservationAdapter implements Adapter<CarReservation>{
  adapt(item:any):CarReservation{
    return new CarReservation(item.id,item.pickUpDate,item.pickUpTime,item.dropOffDate,item.dropOffTime,
      item.price,item.companyName,item.carModel,item.carBrand,item.carRate,item.companyRate,item.canRate,item.carLogo,item.carId);
  }
}
