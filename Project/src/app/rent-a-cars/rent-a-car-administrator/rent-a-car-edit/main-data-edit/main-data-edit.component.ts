import { Component, OnInit } from '@angular/core';
import { FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { RentCarService } from 'src/app/services/rent-a-car.service';
import { RentCar } from 'src/app/models/rent-a-car.model';

@Component({
  selector: 'app-main-data-edit',
  templateUrl: './main-data-edit.component.html',
  styleUrls: ['./main-data-edit.component.css']
})
export class MainDataEditComponent implements OnInit {

  dataForm:FormGroup;
  rentCarCompany:RentCar;

  constructor(private rentCarService:RentCarService) {

   }

  ngOnInit(): void {

    this.rentCarCompany = this.rentCarService.getRentCarCompany(1);

    this.dataForm = new FormGroup({
      'name': new FormControl(this.rentCarCompany.name,Validators.required),
      'address' : new FormControl(this.rentCarCompany.address,Validators.required),
      'description' : new FormControl(this.rentCarCompany.description,Validators.required)
    })

  }

  editCompanyData(){
    var newName = this.dataForm.get('name').value;
    var newAddress = this.dataForm.get('address').value;
    var newDescription = this.dataForm.get('description').value;
    if(this.rentCarService.editCompanyData(this.rentCarCompany.id,newName,newDescription,newAddress)){
      this.rentCarCompany.name=newName;
      this.rentCarCompany.address=newAddress;
      this.rentCarCompany.description=newDescription;
  }

    this.dataForm.reset();
    this.setFormValues();
}

  setFormValues():void{
    this.dataForm.patchValue({
      'name':this.rentCarCompany.name,
      'address':this.rentCarCompany.address,
      'description' : this.rentCarCompany.description
    })
  }
}


