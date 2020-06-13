import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Plane } from 'src/app/models/plane';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AirlineProfileComponent } from 'src/app/components/airlines/airline-profile/airline-profile.component';
import { AirlineService } from 'src/app/services/airline.service';
import { AirlineAdministratorService } from 'src/app/services/airline-administrator.service';
import { Subscription, Subject } from 'rxjs';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { PlaneService } from 'src/app/services/plane.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-edit-plane',
  templateUrl: './edit-plane.component.html',
  styleUrls: ['./edit-plane.component.css']
})
export class EditPlaneComponent implements OnInit {

  public plane:Plane;
  mySubscription:Subscription;
  disabledSeats:string[]=[];
  addSeatsForm:FormGroup;
  closeResult:string='';
  isLoading:boolean;
  isLoaded=false;
  constructor(private route:ActivatedRoute, private planeService:PlaneService, private modalService: NgbModal, private router:Router ,
    private spinner: NgxSpinnerService) {

    this.addSeatsForm=new FormGroup({
      'segment':new FormControl('', Validators.required),
      'rowsInput':new FormControl('', Validators.required)
    });
   }

  ngOnInit(): void {
    this.showLoader();
    this.planeService.getPlane(this.route.snapshot.params['id']).subscribe((res:any)=>{
      console.log('edit plane ',res);
        this.plane = res;
        this.isLoaded=true;
        this.hideLoader();
      },
      (err)=>{
        this.hideLoader();
      }
    );
  }

  open(content){

    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  addSeats(){
    let segment =this.addSeatsForm.get('segment').value;
    let rows = +this.addSeatsForm.get('rowsInput').value;

    console.log('segments, rows: ', segment, rows);
    console.log('before adding: ', this.plane.segments.find(x=>x.name === segment).rows);
    this.plane.segments.find(x=>x.name === segment).rows = this.plane.segments.find(x=>x.name === segment).rows + rows;
    console.log('after adding: ', this.plane.segments.find(x=>x.name === segment).rows);

    this.planeService.updatePlaneConfig(this.plane.code, this.plane).subscribe((res:any)=>{
      Swal.fire({
        text: 'Successfully added new seats!',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500,
      });
      this.showLoader();
    this.planeService.getPlane(this.plane.code).subscribe((res:any)=>{
      this.plane=undefined;
      this.plane=res;
      this.hideLoader();
    })
  }  ,
    (err)=>{
      Swal.fire({
        text: err.error.message,
        icon: 'error',
        showConfirmButton: true
      })
    });
  }

  showLoader(){
    this.isLoading = true;
    this.spinner.show();
  }

  hideLoader(){
    this.spinner.hide();
    this.isLoading = false;
  }
}
