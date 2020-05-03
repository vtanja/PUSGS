import { Component, OnInit, Input } from '@angular/core';
import { CarReservation } from 'src/app/models/carReservation.model';
import { RentCarService } from 'src/app/rent-a-cars/rent-a-car.service';
import { Car } from 'src/app/models/Car.model';
import { RentCar } from 'src/app/models/rent-a-car.model';

@Component({
  selector: 'app-car-reservation-item',
  templateUrl: './car-reservation-item.component.html',
  styleUrls: ['./car-reservation-item.component.css']
})
export class CarReservationItemComponent implements OnInit {

  @Input('reservation') reservation:CarReservation;
  car:Car;
  company:RentCar;
  constructor(private rentCarService:RentCarService) { }

  ngOnInit(): void {
    this.car = this.rentCarService.getRentCarCompany(this.reservation.companyId).cars.find(c=>c.id==this.reservation.carId);
    this.company = this.rentCarService.getRentCarCompany(this.reservation.companyId);
  }

}
