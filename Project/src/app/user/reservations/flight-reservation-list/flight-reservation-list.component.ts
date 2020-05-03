import { Component, OnInit } from '@angular/core';
import { FlightReservation } from 'src/app/models/flightReservation.model';
import { UserService } from '../../userService.service';

@Component({
  selector: 'app-flight-reservation-list',
  templateUrl: './flight-reservation-list.component.html',
  styleUrls: ['./flight-reservation-list.component.css']
})
export class FlightReservationListComponent implements OnInit {

  flightReservations:FlightReservation[]=[];
  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.flightReservations=this.userService.getFlightReservations();
  }

}
