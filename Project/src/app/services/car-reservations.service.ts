import { Injectable } from "@angular/core";
import { RentCarService } from './rent-a-car.service';
import { Subject } from 'rxjs';

@Injectable()
export class CarReservationsService{

  ratingModalClose = new Subject();
  constructor(private rentCarService: RentCarService){

  }

}
