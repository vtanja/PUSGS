import { Component, OnInit } from '@angular/core';
import { RentCar } from 'src/app/models/rent-a-car.model';

@Component({
  selector: 'app-rent-a-car-edit',
  templateUrl: './rent-a-car-edit.component.html',
  styleUrls: ['./rent-a-car-edit.component.css']
})
export class RentACarEditComponent implements OnInit {

  company:RentCar;

  constructor() { }

  ngOnInit(): void {
  }

}
