import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RentCar } from 'src/app/models/rent-a-car.model';
import { Airline } from 'src/app/models/airline.model';

@Component({
  selector: 'app-profile-navbar',
  templateUrl: './profile-navbar.component.html',
  styleUrls: ['./profile-navbar.component.css']
})
export class ProfileNavbarComponent implements OnInit {

  @Input('company') company;
   @Output('route') routeEmitter: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  onRouteClick(route:string){
    this.routeEmitter.emit(route);
  }

}
