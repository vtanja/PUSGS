import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Flight } from 'src/app/models/flight.model';
import { FlightService } from 'src/app/services/flight.service';
import { PlaneService } from 'src/app/services/plane.service';
import { AirlineService } from 'src/app/services/airline.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-admin-flights',
  templateUrl: './admin-flights.component.html',
  styleUrls: ['./admin-flights.component.css']
})
export class AdminFlightsComponent implements OnInit {
  isSpinning:boolean=false;
  flights:Flight[]=[];

  constructor(private spinner: NgxSpinnerService, private flightService:FlightService, private planeService:PlaneService, private airlineService:AirlineService) { }

  ngOnInit(): void {
    this.showSpinner();
    this.flightService.getFlights().subscribe((res:any)=>{
      this.flights=res;
      this.hideSpinner();
      console.log(this.flights);
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
