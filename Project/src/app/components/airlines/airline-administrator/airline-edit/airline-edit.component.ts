import { Component, OnInit } from '@angular/core';
import { Airline } from 'src/app/models/airline.model';
import { AirlineAdministratorService } from 'src/app/services/airline-administrator.service';

@Component({
  selector: 'app-airline-edit',
  templateUrl: './airline-edit.component.html',
  styleUrls: ['./airline-edit.component.css']
})
export class AirlineEditComponent implements OnInit {

  airline:Airline;

  constructor(private airlineAdministratorService:AirlineAdministratorService) { }

  ngOnInit(): void {
    //this.airline = this.airlineAdministratorService.getAirline();
  }

}
