import { Component, OnInit, Input } from '@angular/core';
import { Car } from 'src/app/models/Car.model';

@Component({
  selector: 'app-car-item',
  templateUrl: './car-item.component.html',
  styleUrls: ['./car-item.component.css']
})
export class CarItemComponent implements OnInit {

  @Input('car') car:Car;
  constructor() { }

  ngOnInit(): void {
  }

}
