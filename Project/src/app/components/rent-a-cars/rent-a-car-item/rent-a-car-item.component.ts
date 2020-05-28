import { Component, OnInit, Input } from '@angular/core';
import { RentCar } from 'src/app/models/rent-a-car.model';

@Component({
  selector: 'app-rent-a-car-item',
  templateUrl: './rent-a-car-item.component.html',
  styleUrls: ['./rent-a-car-item.component.css']
})
export class RentACarItemComponent implements OnInit {

  @Input('rentCar') rentCar:RentCar;


  constructor() { }

  ngOnInit(): void {
  }

}
