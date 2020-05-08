import { Component, OnInit, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Car } from 'src/app/models/Car.model';
import { RentCar } from 'src/app/models/rent-a-car.model';
import { Airline } from 'src/app/models/airline';
import { Flight } from 'src/app/models/flight';
import { CarReservationsService } from 'src/app/services/car-reservations.service';
import { AirlineService } from 'src/app/services/airline.service';

@Component({
  selector: 'app-rate-dialog',
  templateUrl: './rate-dialog.component.html',
  styleUrls: ['./rate-dialog.component.css']
})
export class RateDialogComponent implements OnInit {

  @Input ('reservationId') reservationId:number;
  @Input('rateItem') rateItem:String;

  currentRate:number;
  rateControl = new FormControl(null, Validators.required);

  constructor(private carReservationsService:CarReservationsService,private airlinesService:AirlineService) { }

  ngOnInit(): void {
    console.log(this.rateControl);
    console.log(this.currentRate);
  }

  sendRate():void{

    if(this.rateItem==='car' || this.rateItem==='carCompany' ){

      this.carReservationsService.ratingModalClose.next();

    }
    else  if(this.rateItem==='flight' || this.rateItem==='airline'){

      this.airlinesService.rateModalClose.next();
    }


  }
}
