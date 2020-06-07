import { Component, OnInit, Input } from '@angular/core';
import { Plane } from 'src/app/models/plane';
import { AirlineAdministratorService } from 'src/app/services/airline-administrator.service';
import Swal from 'sweetalert2';
import { PlaneService } from 'src/app/services/plane.service';

@Component({
  selector: 'app-plane-list',
  templateUrl: './plane-list.component.html',
  styleUrls: ['./plane-list.component.css']
})
export class PlaneListComponent implements OnInit {

  @Input('planes') planes:Plane[];
  constructor(private planeService:PlaneService) { }

  ngOnInit(): void {
  }

  removePlane(planeId:string){
    this.planeService.deletePlane(planeId).subscribe((res:any)=>{
      Swal.fire({
        text: 'Plane successfully deleted!',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500
      });

      this.planeService.getPlanes().subscribe((res:any)=>{
        this.planes=res;
      })
    }
    ,(err)=>{
      Swal.fire({
        text: err.error.message,
        icon: 'error',
        showConfirmButton: true,
      });
    });
  }
}