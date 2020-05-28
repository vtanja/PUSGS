import { Component, OnInit, Input } from '@angular/core';
import { RentCar } from 'src/app/models/rent-a-car.model';
import { Airline } from 'src/app/models/airline.model';
@Component({
  selector: 'app-profile-navbar',
  templateUrl: './profile-navbar.component.html',
  styleUrls: ['./profile-navbar.component.css']
})
export class ProfileNavbarComponent implements OnInit {
  
  @Input('company') company;
  constructor() { }

  ngOnInit(): void {
    console.log(this.company);
  }

}
