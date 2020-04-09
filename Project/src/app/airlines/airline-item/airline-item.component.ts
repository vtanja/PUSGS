import { Component, OnInit, Input } from '@angular/core';
import { Airline } from 'src/app/models/airline';

@Component({
  selector: 'app-airline-item',
  templateUrl: './airline-item.component.html',
  styleUrls: ['./airline-item.component.css']
})
export class AirlineItemComponent implements OnInit {

  @Input() airline:Airline;
  constructor() { }

  ngOnInit(): void {
  }

}
