import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FlightReservation } from 'src/app/models/flight-reservation.model';
import { UserService } from '../../../../services/user-service.service';
import { FlightReservationService } from 'src/app/services/flight-reservation.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-flight-reservation-list',
  templateUrl: './flight-reservation-list.component.html',
  styleUrls: ['./flight-reservation-list.component.css']
})
export class FlightReservationListComponent implements OnInit, AfterViewInit {
  isSpinning:boolean=false;
  flightReservations:FlightReservation[]=[];
  constructor(private flightReservationService:FlightReservationService, private spinner: NgxSpinnerService) { }
  ngAfterViewInit(): void {
    // this.flightReservationService.getFlightReservations().subscribe((res:any)=>{
    //   this.flightReservations = res;
    //   console.log(this.flightReservations);
    // })

    this.flightReservationService.reload.subscribe(()=>{
      this.showSpinner();
    this.flightReservationService.getFlightReservations().subscribe((res:any)=>{
      this.flightReservations=[];
      this.flightReservations = res;
      this.hideSpinner();
      console.log(this.flightReservations);
    })
    })
  }

  ngOnInit(): void {
    this.showSpinner();
    this.flightReservationService.getFlightReservations().subscribe((res:any)=>{
      this.flightReservations=[];
      this.flightReservations = res;
      this.hideSpinner();
      console.log(this.flightReservations);
    })
  }

  
  showSpinner(){
    this.isSpinning = true;
    this.spinner.show();
  }

  hideSpinner(){
    this.spinner.hide();
    this.isSpinning = false;
  }

}
