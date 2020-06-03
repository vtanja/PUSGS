import { Injectable, OnInit } from '@angular/core';
import { RentCar } from '../models/rent-a-car.model';
import { RentCarService } from './rent-a-car.service';
import { Car } from '../models/Car.model';
import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { Address } from '../models/address';
import { UserService } from './user-service.service';

@Injectable()
export class RentCarAdministratorService {

  constructor(private rentCarService:RentCarService,private usersService:UserService,private calendar: NgbCalendar){

  }

  addDiscount(companyID:number,carID:number,startDate:NgbDate,endDate:NgbDate,discount:number):boolean{
    return true;
  }

  stringToNgbDate(date:string):NgbDate{

    let dateParts = date.split('-');

    return new NgbDate(+dateParts[2],+dateParts[1],+dateParts[0]);

  }




}
