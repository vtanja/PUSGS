import { Component, OnInit, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Car } from 'src/app/models/Car.model';
import { RentCar } from 'src/app/models/rent-a-car.model';
import { Airline } from 'src/app/models/airline.model';
import { Flight } from 'src/app/models/flight.model';
import { CarReservationsService } from 'src/app/services/car-reservations.service';
import { AirlineService } from 'src/app/services/airline.service';
import { UserService } from 'src/app/services/user-service.service';
import { RatesService } from 'src/app/services/rates.service';
import Swal from 'sweetalert2';
import { LEFT_ARROW } from '@angular/cdk/keycodes';
import { FlightReservationService } from 'src/app/services/flight-reservation.service';

@Component({
  selector: 'app-rate-dialog',
  templateUrl: './rate-dialog.component.html',
  styleUrls: ['./rate-dialog.component.css']
})
export class RateDialogComponent implements OnInit {

  @Input ('reservationId') reservationId:number;
  @Input('rateItem') rateItem:String;

  rateControl = new FormControl(null, Validators.required);

  constructor(private carReservationsService:CarReservationsService,private airlinesService:AirlineService,
              private ratesService:RatesService,private flightReservationService:FlightReservationService) { }

  ngOnInit(): void {
  }

  sendRate():void{

    let data = {
      ReservationId : this.reservationId,
      Rate : this.rateControl.value
    }
    if(this.rateItem==='car'){
      this.addCarRate(data);
      let ret={
        car:true,
        rate:data.Rate
      }
      this.carReservationsService.ratingModalClose.next(ret);

    }else if(this.rateItem==='carCompany'){
      let ret={
        company:true,
        rate:data.Rate
      }
      this.addCarCompanyRate(data);
      this.carReservationsService.ratingModalClose.next(ret);
    }
    else  if(this.rateItem==='flight') {

      let ret={
        flight:true,
        rate:data.Rate
      }

      this.addFlightRate(data);
      this.flightReservationService.rateModalClose.next(ret);

    } else if (this.rateItem==='airline'){

      let ret={
        airline:true,
        rate:data.Rate
      }

      this.addAirlineRate(data);
      this.flightReservationService.rateModalClose.next(ret);

    }

    this.rateControl.reset();
  }

  addCarRate(data){
    this.ratesService.addCarRate(data).subscribe(
      res =>{
        Swal.fire({
          text: "Car rate successfully added.",
          icon: 'success',
          showConfirmButton: false,
          timer: 2300,
        });
      },
      err => {
        console.log(err);
      }
    )
  }

  addCarCompanyRate(data){
    this.ratesService.addCarCompanyRate(data).subscribe(
      res =>{
        Swal.fire({
          text: "Rent car company rate successfully added.",
          icon: 'success',
          showConfirmButton: false,
          timer: 2300,
        });
      },
      err => {
        console.log(err);
      }
    )
  }

  addFlightRate(data){
    this.ratesService.addFlightRate(data).subscribe(
      res =>{
        Swal.fire({
          text: "Flight rate successfully added.",
          icon: 'success',
          showConfirmButton: false,
          timer: 2300,
        });
      },
      err => {
        console.log(err);
      }
    )
  }

  addAirlineRate(data){
    this.ratesService.addAirlineRate(data).subscribe(
      res =>{
        Swal.fire({
          text: "Airline company rate successfully added.",
          icon: 'success',
          showConfirmButton: false,
          timer: 2300,
        });
      },
      err => {
        console.log(err);
      }
    )
  }
}
