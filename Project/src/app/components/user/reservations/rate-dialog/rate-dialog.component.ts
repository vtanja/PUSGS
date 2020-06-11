import { Component, OnInit, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Car } from 'src/app/models/Car.model';
import { RentCar } from 'src/app/models/rent-a-car.model';
import { Airline } from 'src/app/models/airline.model';
import { Flight } from 'src/app/models/flight.model';
import { CarReservationsService } from 'src/app/services/car-reservations.service';
import { AirlineService } from 'src/app/services/airline.service';
import { UserService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-rate-dialog',
  templateUrl: './rate-dialog.component.html',
  styleUrls: ['./rate-dialog.component.css']
})
export class RateDialogComponent implements OnInit {

  @Input ('reservationId') reservationId:number;
  @Input('companyId') companyId:number;
  @Input('vehicleId') vehicleId:number;
  @Input('rateItem') rateItem:String;

  rateControl = new FormControl(null, Validators.required);

  constructor(private carReservationsService:CarReservationsService,private airlinesService:AirlineService,private userService:UserService) { }

  ngOnInit(): void {
  }

  sendRate():void{

    if(this.rateItem==='car'){

      this.userService.addCarRate(this.reservationId,this.rateControl.value);
      this.carReservationsService.ratingModalClose.next();

    }else if(this.rateItem==='carCompany'){

      this.userService.addCarCompanyRate(this.reservationId,this.rateControl.value);
      this.carReservationsService.ratingModalClose.next();
    }
    else  if(this.rateItem==='flight') {

      //this.userService.addFlightRate(this.reservationId,this.rateControl.value);
      //this.airlinesService.rateModalClose.next();

    } else if (this.rateItem==='airline'){

      //this.userService.addAirlineRate(this.reservationId,this.rateControl.value);
      //this.airlinesService.rateModalClose.next();

    }

    this.rateControl.reset();


  }
}
