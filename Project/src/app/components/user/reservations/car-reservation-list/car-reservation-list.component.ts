import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CarReservation } from 'src/app/models/car-reservation.model';
import { UserService } from '../../../../services/user-service.service';
import { CarReservationsService } from 'src/app/services/car-reservations.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-car-reservation-list',
  templateUrl: './car-reservation-list.component.html',
  styleUrls: ['./car-reservation-list.component.css']
})
export class CarReservationListComponent implements OnInit, AfterViewInit {

  isSpinning:boolean=false;
  carReservations:CarReservation[]=[];
  constructor(private rentCarReservationService:CarReservationsService, private spinner: NgxSpinnerService) { }
  ngAfterViewInit(): void {
    this.rentCarReservationService.reload.subscribe(()=>{
      this.showSpinner();
      this.rentCarReservationService.getReservations().subscribe((res:any)=>{
        this.carReservations = [];
        this.carReservations = res;
        this.hideSpinner();
      })
    })
  }

  ngOnInit(): void {
    this.showSpinner();
      this.rentCarReservationService.getReservations().subscribe((res:any)=>{
        this.carReservations = [];
        this.carReservations = res;
        this.hideSpinner();
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
