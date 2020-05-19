import { Component, OnInit, Input } from '@angular/core';
import { Plane } from 'src/app/models/plane';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AirlineProfileComponent } from 'src/app/airlines/airline-profile/airline-profile.component';
import { AirlineService } from 'src/app/services/airline.service';
import { AirlineAdministratorService } from 'src/app/services/airline-administrator.service';
import { Subscription, Subject } from 'rxjs';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-plane',
  templateUrl: './edit-plane.component.html',
  styleUrls: ['./edit-plane.component.css']
})
export class EditPlaneComponent implements OnInit {

  plane:Plane;
  mySubscription:Subscription;
  disabledSeats:string[]=[];
  addSeatsForm:FormGroup;
  closeResult:string='';


  constructor(private route:ActivatedRoute, private airlineAdminService:AirlineAdministratorService, private modalService: NgbModal, private router:Router ) {
    this.addSeatsForm=new FormGroup({
      'segment':new FormControl('', Validators.required),
      'rowsInput':new FormControl('', Validators.required)
    });
   }

  ngOnInit(): void {
    this.mySubscription = this.route.params.subscribe((params:Params)=>
      {
        this.plane=this.airlineAdminService.getAirline().planes.find(p=>p.id===+params['id']);
        console.log('edit plane');
        console.log(this.plane);
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

    if(this.airlineAdminService.addSeats(this.plane.id, segment, rows)){
      //this.plane.segments.find(s=>s.name===segment).value.rows+=rows;
      Swal.fire({
        text: 'Successfully added new seats!',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500,
      });
      this.plane=this.airlineAdminService.getAirline().planes.find(p=>p.id===this.plane.id);
    }
    else{
      Swal.fire({
        text: 'Unable to add new seats!',
        icon: 'error',
        showConfirmButton: true,
        timer: 1500,
      });
    }
  }

}
