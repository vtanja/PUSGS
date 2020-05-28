import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Airline } from 'src/app/models/airline.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AirlineAdministratorService } from 'src/app/services/airline-administrator.service';
import { Address } from 'src/app/models/address';
import { DestinationService } from 'src/app/services/destination.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import Swal from 'sweetalert2';
import { Destination } from 'src/app/models/destination.model';

@Component({
  selector: 'app-edit-destinations',
  templateUrl: './edit-destinations.component.html',
  styleUrls: ['./edit-destinations.component.css']
})
export class EditDestinationsComponent implements OnInit {

  company:Airline;
  addDestinationForm:FormGroup;
  closeResult:string;

  constructor(private airlineAdminSerivce:AirlineAdministratorService, private destinationService:DestinationService,private modalService: NgbModal) {
    this.airlineAdminSerivce.getAirline().subscribe((res:Airline)=>{
      this.company = res;
    }, (err)=>{
      console.log(err);
    });

    this.addDestinationForm = new FormGroup({
      'city' : new FormControl('',Validators.required),
      'country' : new FormControl('',Validators.required),
    });
   }

  ngOnInit(): void {
    
    this.airlineAdminSerivce.getAirline().subscribe((res:Airline)=>{
      this.company = res;
    });
  }

  addDestination(){
      let dest=new Destination(-1, this.addDestinationForm.get('city').value, this.addDestinationForm.get('country').value);
      console.log(dest);
      this.destinationService.addDestination(dest).subscribe((res:any)=>{
        Swal.fire({
          text: 'Destination successfully added!',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500,
        });

        this.airlineAdminSerivce.getAirline().subscribe((res:Airline)=>{
          this.company = res;
        });
        
      }, 
      (err:any)=>{
        Swal.fire({
          text: err.error.message,
          icon: 'error',
          showConfirmButton: true,
        });
      })

  }

  openModal(content){

    this.addDestinationForm.reset();

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title-adm'}).result.then((result) => {
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

}
