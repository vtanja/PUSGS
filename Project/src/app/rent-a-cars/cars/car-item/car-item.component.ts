import { Component, OnInit, Input } from '@angular/core';
import { Car } from 'src/app/models/Car.model';
import { UserService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-car-item',
  templateUrl: './car-item.component.html',
  styleUrls: ['./car-item.component.css']
})
export class CarItemComponent implements OnInit {

  @Input('car') car:Car;
  @Input('daysBetween')daysBetween:number;

  isUserLogged:boolean;
  constructor(private usersService:UserService) { }

  ngOnInit(): void {
    this.isUserLogged = this.usersService.isUserLogged();
  }



}
