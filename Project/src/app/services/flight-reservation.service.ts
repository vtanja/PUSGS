import { Injectable } from '@angular/core';
import { FlightReservation } from '../models/flight-reservation.model';
import { UserService } from './user-service.service';
import { HttpClient } from '@angular/common/http';
import { regExpEscape } from '@ng-bootstrap/ng-bootstrap/util/util';
import { Observable, Subject } from 'rxjs';
import { subscribeOn } from 'rxjs/operators';
import { CarReservation } from '../models/car-reservation.model';

@Injectable({
  providedIn: 'root'
})
export class FlightReservationService {

  airlinebarChartSubject = new Subject();
  monthlyIncomesSubject = new Subject();
  annualIncomesSubject = new Subject();

  pendingReservation:FlightReservation;
  pendingCarReservation:{} = {};
  rateModalClose = new Subject<{}>();
  readonly baseUri = 'http://localhost:51474/api/';

  constructor(private userService:UserService, private httpClient:HttpClient) { }

  getWeeklyReport(){
    return this.httpClient.get(this.baseUri+"FlightReservations/Weekly");
  }

  getDailyReport(){
    return this.httpClient.get(this.baseUri+"FlightReservations/Daily");
  }

  getMonthlyReport(){
    return this.httpClient.get(this.baseUri+"FlightReservations/Monthly");
  }

  getMonthlyIncomes(data){
    return this.httpClient.get(this.baseUri+"FlightReservations/MonthlyIncomes/" + data);
  }

  getAnnualIncomes(data){
    console.log('annual incomes');
    return this.httpClient.get(this.baseUri+"FlightReservations/AnnualIncomes/" + data);
  }

  getAverageRating(){
    return this.httpClient.get(this.baseUri+'Flights/Average');
  }


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

  setPendingCarReservation(carReservation:{}){
    this.pendingCarReservation=carReservation;
  }

  getPendingCarReservation(){
    return this.pendingCarReservation;
  }

  resetPendingCarReservation(){
    this.pendingCarReservation=null;
  }

  checkInvitationsUpdateBonusPoints(){
    let id = "all";
    return this.httpClient.put(this.baseUri+'FlightReservations/Update',{} );
  }

}
