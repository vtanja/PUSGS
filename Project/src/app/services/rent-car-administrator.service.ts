import { Injectable, OnInit } from '@angular/core';
import { RentCar } from '../models/rent-a-car.model';
import { RentCarService } from './rent-a-car.service';
import { Car } from '../models/Car.model';
import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { Address } from '../models/address';
import { Subscription, Subject } from 'rxjs';
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





  async reverseGeocode(address:Address) {
    let city = address.city.replace(' ','+');
    let street = address.street.replace(' ','+');
    let country = address.country.replace(' ','+');
    const data = await fetch('https://nominatim.openstreetmap.org/search?q=' + address.num + '+'+street+',+'+city + ',+' + country+'&format=json',{
       headers:{
         'Accept-Language' : 'en-US'
       }
     });
     console.log("data here");
             const res = await data.json();
             address.longitude = +res[0].lon;
             address.latitude=+res[0].lat;
   }


}
