import { Component, OnInit } from '@angular/core';
import { Airline } from 'src/app/models/airline.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AirlineAdministratorService } from 'src/app/services/airline-administrator.service';
import { Address } from 'src/app/models/address';

@Component({
  selector: 'app-edit-destinations',
  templateUrl: './edit-destinations.component.html',
  styleUrls: ['./edit-destinations.component.css']
})
export class EditDestinationsComponent implements OnInit {

  company:Airline;
  addDestinationForm:FormGroup;
  closeResult:string;

  constructor(private airlineAdministratorService:AirlineAdministratorService,private modalService: NgbModal) {
    this.addDestinationForm = new FormGroup({
      'city' : new FormControl('',Validators.required),
      'country' : new FormControl('',Validators.required),
    });
   }

  ngOnInit(): void {
    
    this.company = this.airlineAdministratorService.getAirline();
  }

  addDestination(){
    let city = this.addDestinationForm.get('city').value;
    let country = this.addDestinationForm.get('country').value;

    if(this.airlineAdministratorService.addDestination(country,city)){
      this.company = this.airlineAdministratorService.getAirline();
    }

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
