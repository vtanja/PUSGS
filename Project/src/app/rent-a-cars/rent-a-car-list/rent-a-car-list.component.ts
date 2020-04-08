import { Component, OnInit } from '@angular/core';
import { RentCarService } from '../rent-a-car.service';
import { Car } from 'src/app/models/Car.model';
import { RentCar } from 'src/app/models/rent-a-car.model';

@Component({
  selector: 'app-rent-a-car-list',
  templateUrl: './rent-a-car-list.component.html',
  styleUrls: ['./rent-a-car-list.component.css']
})
export class RentACarListComponent implements OnInit {

  rentCars: Array<RentCar>;

  constructor(private rentCarService:RentCarService) {


   }

  ngOnInit(): void {

    this.rentCars = this.rentCarService.getRentCars();

  }

}
