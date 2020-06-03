import { Component, OnInit, Input } from '@angular/core';
import { Plane } from 'src/app/models/plane';
import { AirlineAdministratorService } from 'src/app/services/airline-administrator.service';
import { PlaneService } from 'src/app/services/plane.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-planes',
  templateUrl: './planes.component.html',
  styleUrls: ['./planes.component.css']
})
export class PlanesComponent implements OnInit {
  isSpining:boolean ;

  planes:Plane[]=[];

  constructor(private planeService:PlaneService,  private toastr: ToastrService,
    private spinner: NgxSpinnerService) {
   }

  ngOnInit(): void {
    this.isSpining = true;
    this.spinner.show();
    this.planeService.getPlanes().subscribe((res:any)=>{
      console.log(res);
      this.planes=res;
      this.spinner.hide();
        this.isSpining = false;
    }, (err)=>{
      this.spinner.hide();
      this.isSpining = false;
    });
    console.log(this.planes);
  }

}
