import { Component, OnInit } from '@angular/core';
import { Airline } from 'src/app/models/airline';
import { AirlineService } from '../../services/airline.service';

@Component({
  selector: 'app-airlines-list',
  templateUrl: './airlines-list.component.html',
  styleUrls: ['./airlines-list.component.css']
})
export class AirlinesListComponent implements OnInit {
  airlines:Airline[]=[];
  sortCriteria:string='';

  constructor(private airlineService:AirlineService) { }

  ngOnInit(): void {
    this.airlines = this.airlineService.getAirlines();
  }


}
