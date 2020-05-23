import { Injectable } from '@angular/core';
import { FlightReservation } from '../models/flight-reservation.model';
import { UserService } from './user-service.service';

@Injectable({
  providedIn: 'root'
})
export class FlightReservationService {

  pendingReservation:FlightReservation;

  constructor(private userService:UserService) { }
  
  saveReservation(reservation:FlightReservation){
    this.pendingReservation=reservation;
  }

  getPendingReservation(){
    if(this.pendingReservation!==undefined){
      return this.pendingReservation;
    }
  }

  completeReservation(){
   // this.userService.getLoggedUser().flightReservations.push(this.pendingReservation);
    this.pendingReservation=undefined;
  }
}
