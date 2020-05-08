import { Component, OnInit } from '@angular/core';
import { CarReservation } from 'src/app/models/carReservation.model';
import { UserService } from '../../../services/userService.service';

@Component({
  selector: 'app-car-reservation-list',
  templateUrl: './car-reservation-list.component.html',
  styleUrls: ['./car-reservation-list.component.css']
})
export class CarReservationListComponent implements OnInit {

  carReservations:CarReservation[]=[];
  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.carReservations=this.userService.getCarReservations();
  }

}
