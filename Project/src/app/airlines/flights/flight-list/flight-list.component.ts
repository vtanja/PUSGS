import { Component, OnInit } from '@angular/core';
import { Flight } from 'src/app/models/flight';
import { AirlineService } from '../../airline.service';

@Component({
  selector: 'app-flight-list',
  templateUrl: './flight-list.component.html',
  styleUrls: ['./flight-list.component.css']
})
export class FlightListComponent implements OnInit {

  flights:Flight[]=[];
  roundFlights: {toFlight:Flight, backFlight:Flight}[]=[];

  params:{};

  constructor(private airlineService:AirlineService) { }

  ngOnInit(): void {
    this.flights=this.airlineService.getFlights();
    this.roundFlights=this.airlineService.getRoundFlights();
    // this.activeRoute.queryParams.subscribe((params:Params)=>
    //   this.params = this.activeRoute.snapshot.queryParams );
    //   this.cars=this.rentCarService.getCars(this.params);
    //   console.log(this.cars);
  }

}
