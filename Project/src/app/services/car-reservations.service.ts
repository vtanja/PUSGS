import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CarReservationsService {
  readonly baseUri = 'http://localhost:51474/api/';

  ratingModalClose = new Subject();
  searchFormClear = new Subject();

  constructor(private httpClient: HttpClient) {}

  makeCarReservation(carReservation:{}) {
    return this.httpClient.post(this.baseUri+"CarReservations" , carReservation);
  }

  cancelCarReservation(){
  }
}
