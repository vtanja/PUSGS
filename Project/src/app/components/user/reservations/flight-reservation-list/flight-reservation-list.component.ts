import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FlightReservation } from 'src/app/models/flight-reservation.model';
import { UserService } from '../../../../services/user-service.service';
import { FlightReservationService } from 'src/app/services/flight-reservation.service';

@Component({
  selector: 'app-flight-reservation-list',
  templateUrl: './flight-reservation-list.component.html',
  styleUrls: ['./flight-reservation-list.component.css']
})
export class FlightReservationListComponent implements OnInit, AfterViewInit {

  flightReservations:FlightReservation[]=[];
  constructor(private flightReservationService:FlightReservationService) { }
  ngAfterViewInit(): void {
    // this.flightReservationService.getFlightReservations().subscribe((res:any)=>{
    //   this.flightReservations = res;
    //   console.log(this.flightReservations);
    // })
  }

  ngOnInit(): void {
    this.flightReservationService.getFlightReservations().subscribe((res:any)=>{
      this.flightReservations = res;
      console.log(this.flightReservations);
    })
  }

}
