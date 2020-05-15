import { Component, OnInit, Input } from '@angular/core';
import { RentCarAdministratorService } from 'src/app/services/rent-car-administrator.service';
import { RentCar } from 'src/app/models/rent-a-car.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Address } from 'src/app/models/address';

@Component({
  selector: 'app-offices-edit',
  templateUrl: './offices-edit.component.html',
  styleUrls: ['./offices-edit.component.css']
})
export class OfficesEditComponent implements OnInit {

  company:RentCar;
  addOfficeForm:FormGroup;
  closeResult:string;

  constructor(private rentCarAdminService:RentCarAdministratorService,private modalService: NgbModal) {
    this.addOfficeForm = new FormGroup({
      'street' : new FormControl('',Validators.required),
      'number' : new FormControl('',Validators.required),
      'city' : new FormControl('',Validators.required),
      'country' : new FormControl('',Validators.required),
    });
  }

  ngOnInit(): void {
    this.company = this.rentCarAdminService.getRentCarCompany();
  }

  openModal(content){

    this.clearForm();

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title-adm'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

  }

  addOffice(){
    let street = this.addOfficeForm.get('street').value;
    let number = this.addOfficeForm.get('number').value;
    let city = this.addOfficeForm.get('city').value;
    let country = this.addOfficeForm.get('country').value;

    let address = new Address(number,street,city,country,-1,-1);

    if(this.rentCarAdminService.addOffice(address)){
      this.company = this.rentCarAdminService.getRentCarCompany();
    }

  }

  clearForm():void{

    this.addOfficeForm.patchValue({
      'street' : '',
      'number' : null,
      'city' : '',
      'country':''
    })

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
