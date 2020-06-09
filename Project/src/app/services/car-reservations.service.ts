import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CarReservationsService {
  readonly baseUri = 'http://localhost:51474/api/';

  ratingModalClose = new Subject();
  searchFormClear = new Subject();
  barChartSubject = new Subject();


  constructor(private httpClient: HttpClient) {}

  makeCarReservation(carReservation:{}) {
    return this.httpClient.post(this.baseUri+"CarReservations" , carReservation);
  }

  cancelCarReservation(){
  }

  getWeeklyReport(companyId:number){
    return this.httpClient.get(this.baseUri+"CarReservations/Weekly/" + companyId);
  }

  getDailyReport(companyId:number){
    return this.httpClient.get(this.baseUri+"CarReservations/Daily/" + companyId);
  }

  getMonthlyReport(companyId:number){
    return this.httpClient.get(this.baseUri+"CarReservations/Monthly/" + companyId);
  }
}
