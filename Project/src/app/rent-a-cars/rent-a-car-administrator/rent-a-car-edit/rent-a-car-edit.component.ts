import { Component, OnInit } from '@angular/core';
import { RentCarService } from 'src/app/services/rent-a-car.service';
import { RentCar } from 'src/app/models/rent-a-car.model';
import { RentCarAdministratorService } from 'src/app/services/rent-car-administrator.service';

@Component({
  selector: 'app-rent-a-car-edit',
  templateUrl: './rent-a-car-edit.component.html',
  styleUrls: ['./rent-a-car-edit.component.css']
})
export class RentACarEditComponent implements OnInit {

  company:RentCar;

  constructor(private rentCarAdministratorService:RentCarAdministratorService) { }

  ngOnInit(): void {
   this.company = this.rentCarAdministratorService.getRentCarCompany();
  }

}
