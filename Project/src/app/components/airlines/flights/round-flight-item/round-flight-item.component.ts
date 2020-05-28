import { Component, OnInit, Input } from '@angular/core';
import { Flight } from 'src/app/models/flight.model';

@Component({
  selector: 'app-round-flight-item',
  templateUrl: './round-flight-item.component.html',
  styleUrls: ['./round-flight-item.component.css']
})
export class RoundFlightItemComponent implements OnInit {

  @Input() roundFlight:{toFlight:Flight, backFlight:Flight};
  constructor() { }

  ngOnInit(): void {
  }

}
