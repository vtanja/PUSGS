import { Component, OnInit } from '@angular/core';
import { CarReservation } from 'src/app/models/car-reservation.model';
import { UserService } from '../../../../services/user-service.service';
import { CarReservationsService } from 'src/app/services/car-reservations.service';

@Component({
  selector: 'app-car-reservation-list',
  templateUrl: './car-reservation-list.component.html',
  styleUrls: ['./car-reservation-list.component.css']
})
export class CarReservationListComponent implements OnInit {

  carReservations:CarReservation[]=[];
  constructor(private rentCarReservationService:CarReservationsService) { }

  ngOnInit(): void {
    this.rentCarReservationService.getReservations().subscribe((res:any)=>{
      this.carReservations = res;
    })
  }

}
