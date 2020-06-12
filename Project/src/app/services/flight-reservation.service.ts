import { Injectable } from '@angular/core';
import { FlightReservation } from '../models/flight-reservation.model';
import { UserService } from './user-service.service';
import { HttpClient } from '@angular/common/http';
import { regExpEscape } from '@ng-bootstrap/ng-bootstrap/util/util';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlightReservationService {

  pendingReservation:FlightReservation;
  rateModalClose = new Subject<{}>();
  readonly baseUri = 'http://localhost:51474/api/';

  constructor(private userService:UserService, private httpClient:HttpClient) { }

  saveReservation(reservation:FlightReservation){
    this.pendingReservation=reservation;
  }

  getPendingReservation(){
    if(this.pendingReservation!==undefined){
      return this.pendingReservation;
    }
  }

  resetReservation(){
    this.pendingReservation = undefined;
  }

  completeReservation(reservation:FlightReservation){
    return this.httpClient.post(this.baseUri+'FlightReservations', reservation );
  }

  getFlightReservations(){
    return this.httpClient.get(this.baseUri + 'FlightReservations/All');
  }

  cancelReservation(reservation:FlightReservation){
    return this.httpClient.put(this.baseUri + 'FlightReservations/'+reservation.reservationId, reservation);
  }
}
