import { Component, OnInit, EventEmitter } from '@angular/core';
import { RentCarService } from './rent-a-car.service';

@Component({
  selector: 'app-rent-a-cars',
  templateUrl: './rent-a-cars.component.html',
  styleUrls: ['./rent-a-cars.component.css']
})

export class RentACarsComponent implements OnInit {
  constructor(private rentCarsService:RentCarService) { }

  ngOnInit(): void {
  }

}
