import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Flight } from 'src/app/models/flight.model';
import { FlightService } from 'src/app/services/flight.service';
import { PlaneService } from 'src/app/services/plane.service';
import { AirlineService } from 'src/app/services/airline.service';

@Component({
  selector: 'app-admin-flights',
  templateUrl: './admin-flights.component.html',
  styleUrls: ['./admin-flights.component.css']
})
export class AdminFlightsComponent implements OnInit, AfterViewInit {

  flights:Flight[]=[];
  showAlert:boolean;

  constructor(private flightService:FlightService, private planeService:PlaneService, private airlineService:AirlineService) { }
  ngAfterViewInit(): void {
    this.flightService.getFlights().subscribe((res:any)=>{
      this.flights=res;
      console.log(this.flights);
      (this.flights===undefined || this.flights.length===0 )?true:false;
    })
  }

  ngOnInit(): void {
    this.flightService.getFlights().subscribe((res:any)=>{
      this.flights=res;
      console.log(this.flights);
      (this.flights===undefined || this.flights.length===0 )?true:false;
    })
  }

}
