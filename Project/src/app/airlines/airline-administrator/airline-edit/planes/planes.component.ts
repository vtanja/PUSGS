import { Component, OnInit, Input } from '@angular/core';
import { Plane } from 'src/app/models/plane';
import { AirlineAdministratorService } from 'src/app/services/airline-administrator.service';

@Component({
  selector: 'app-planes',
  templateUrl: './planes.component.html',
  styleUrls: ['./planes.component.css']
})
export class PlanesComponent implements OnInit {

  planes:Plane[]=[];

  constructor(private airlineAdminService:AirlineAdministratorService) {
   }

  ngOnInit(): void {
    this.planes = this.airlineAdminService.getAirline().planes;
    console.log(this.planes);
  }

}
