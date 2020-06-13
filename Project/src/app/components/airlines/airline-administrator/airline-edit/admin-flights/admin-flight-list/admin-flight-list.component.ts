import { Component, OnInit, Input } from '@angular/core';
import { Flight } from 'src/app/models/flight.model';

@Component({
  selector: 'app-admin-flight-list',
  templateUrl: './admin-flight-list.component.html',
  styleUrls: ['./admin-flight-list.component.css']
})
export class AdminFlightListComponent implements OnInit {

  @Input() flights:Flight[];
  
  constructor() { }

  ngOnInit(): void {
  }

  

  
  
}
