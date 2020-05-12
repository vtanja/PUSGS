import { Component, OnInit, Input } from '@angular/core';
import { RentCarAdministratorService } from 'src/app/services/rent-car-administrator.service';
import { RentCar } from 'src/app/models/rent-a-car.model';

@Component({
  selector: 'app-offices-edit',
  templateUrl: './offices-edit.component.html',
  styleUrls: ['./offices-edit.component.css']
})
export class OfficesEditComponent implements OnInit {

  company:RentCar;

  constructor(private rentCarAdminService:RentCarAdministratorService) { }

  ngOnInit(): void {
    this.company = this.rentCarAdminService.getRentCarCompany();
  }

}
