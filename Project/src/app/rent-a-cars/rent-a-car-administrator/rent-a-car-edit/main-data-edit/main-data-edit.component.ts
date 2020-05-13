import { Component, OnInit } from '@angular/core';
import { FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { RentCarService } from 'src/app/services/rent-a-car.service';
import { RentCar } from 'src/app/models/rent-a-car.model';
import { RentCarAdministratorService } from 'src/app/services/rent-car-administrator.service';

@Component({
  selector: 'app-main-data-edit',
  templateUrl: './main-data-edit.component.html',
  styleUrls: ['./main-data-edit.component.css']
})
export class MainDataEditComponent implements OnInit {

  dataForm:FormGroup;
  rentCarCompany:RentCar;
  imgPreview:string | ArrayBuffer;

  constructor(private rentCarAdminService:RentCarAdministratorService) {

   }

  ngOnInit(): void {

    this.rentCarCompany = this.rentCarAdminService.getRentCarCompany();
    this.imgPreview = this.rentCarCompany.logo;
    this.dataForm = new FormGroup({
      'name': new FormControl(this.rentCarCompany.name,Validators.required),
      'address' : new FormControl(this.rentCarCompany.address,Validators.required),
      'description' : new FormControl(this.rentCarCompany.description,Validators.required),
      'file': new FormControl('', [Validators.required]),
       'fileSource': new FormControl('', [Validators.required])
    })

  }

  editCompanyData():void{
    var newName = this.dataForm.get('name').value;
    var newAddress = this.dataForm.get('address').value;
    var newDescription = this.dataForm.get('description').value;
    var newLogo = this.dataForm.get('fileSource').value;

    if(this.rentCarAdminService.editCompanyData(this.rentCarCompany.id,newName,newDescription,newAddress,newLogo)){
      this.rentCarCompany.name=newName;
      this.rentCarCompany.address=newAddress;
      this.rentCarCompany.description=newDescription;
      this.rentCarCompany.logo = newLogo;
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

  onFileChange(event) {

    if (event.target.files.length > 0) {

      const file = event.target.files[0];

      if (file.type.match('image\/*') == null) {
      console.log("Not supported");
        return;
      }

      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        this.imgPreview = reader.result;
        console.log(this.imgPreview);
      }

      this.dataForm.patchValue({
        fileSource: file
      });

    }
  }
}


