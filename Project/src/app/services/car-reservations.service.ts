import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CarReservationAdapter } from '../models/adapters/car-reservation.adapter';
import { map } from 'rxjs/operators';
import { CarReservation } from '../models/car-reservation.model';

@Injectable()
export class CarReservationsService {
  readonly baseUri = 'http://localhost:51474/api/';

  ratingModalClose = new Subject<{}>();
  searchFormClear = new Subject();
  barChartSubject = new Subject();
  monthlyIncomesSubject = new Subject();
  annualIncomesSubject = new Subject();

  reload=new Subject();
  constructor(private httpClient: HttpClient,private carReservationAdapter:CarReservationAdapter) {}

  makeCarReservation(carReservation:{}) {
    return this.httpClient.post(this.baseUri+"CarReservations" , carReservation);
  }

  makeCarQuickReservation(carReservation:{}) {
    return this.httpClient.post(this.baseUri+"CarReservations/QuickReservation" , carReservation);
  }

  cancelCarReservation(){
  }

  getWeeklyReport(){
    return this.httpClient.get(this.baseUri+"CarReservations/Weekly");
  }

  getDailyReport(){
    return this.httpClient.get(this.baseUri+"CarReservations/Daily");
  }

  getMonthlyReport(){
    return this.httpClient.get(this.baseUri+"CarReservations/Monthly");
  }

  getMonthlyIncomes(data){
    return this.httpClient.get(this.baseUri+"CarReservations/MonthlyIncomes/" + data);
  }

  getAnnualIncomes(data){
    return this.httpClient.get(this.baseUri+"CarReservations/AnnualIncomes/" + data);
  }

  getReservations(){
    return this.httpClient.get(this.baseUri + 'CarReservations').pipe(
      map((data: any[]) => data.map(item => this.carReservationAdapter.adapt(item))),
    );
  }

  cancelReservation(id:number,reservation:{}){
    return this.httpClient.put(this.baseUri + 'CarReservations/'+id, reservation);
  }
}
