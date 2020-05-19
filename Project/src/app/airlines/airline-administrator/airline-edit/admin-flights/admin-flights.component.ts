import { Component, OnInit, Input } from '@angular/core';
import { Flight } from 'src/app/models/flight.model';

@Component({
  selector: 'app-admin-flights',
  templateUrl: './admin-flights.component.html',
  styleUrls: ['./admin-flights.component.css']
})
export class AdminFlightsComponent implements OnInit {

  flights:Flight[]=[];

  constructor() { }

  ngOnInit(): void {
  }

}
