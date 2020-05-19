import { Component, OnInit, Input } from '@angular/core';
import { Plane } from 'src/app/models/plane';
import { AirlineAdministratorService } from 'src/app/services/airline-administrator.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-plane-list',
  templateUrl: './plane-list.component.html',
  styleUrls: ['./plane-list.component.css']
})
export class PlaneListComponent implements OnInit {

  @Input('planes') planes:Plane[];
  constructor(private airlineAdminService:AirlineAdministratorService) { }

  ngOnInit(): void {
  }

  removePlane(planeId:number){
    if(this.airlineAdminService.deletePlane(planeId)){
      Swal.fire({
        text: 'Plane successfully deleted!',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500
      });
    }
    else{
      Swal.fire({
        text: 'Plane cannot be deleted beacause there are flights operated by this plane!',
        icon: 'error',
        showConfirmButton: true,
        timer: 1500
      });
    }
  }
}
