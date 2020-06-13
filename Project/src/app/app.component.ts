import { Component, OnInit } from '@angular/core';
import { FlightReservationService } from './services/flight-reservation.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'web-project';

  isSpinning:boolean = false;

  constructor(private flightReservationService:FlightReservationService, private spinner: NgxSpinnerService,){}


  ngOnInit(): void {
    this.showSpinner();
    this.flightReservationService.checkInvitationsUpdateBonusPoints().subscribe((res:any)=>{
      this.hideSpinner();
    });
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



