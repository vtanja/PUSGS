import { Component, OnInit } from '@angular/core';
import { FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { RentCarService } from 'src/app/services/rent-a-car.service';
import { RentCar } from 'src/app/models/rent-a-car.model';
import { RentCarAdministratorService } from 'src/app/services/rent-car-administrator.service';
import { Address } from 'src/app/models/address';

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

    console.log(this.rentCarCompany.address);

    this.imgPreview = this.rentCarCompany.logo;
    this.dataForm = new FormGroup({
      'name': new FormControl(this.rentCarCompany.name,Validators.required),
      'street' : new FormControl(this.rentCarCompany.address.street,Validators.required),
      'number' : new FormControl(this.rentCarCompany.address.num,Validators.required),
      'city' : new FormControl(this.rentCarCompany.address.city,Validators.required),
      'country' : new FormControl(this.rentCarCompany.address.country,Validators.required),
      'description' : new FormControl(this.rentCarCompany.description,Validators.required),
      'file': new FormControl('', [Validators.required]),
       'fileSource': new FormControl('', [Validators.required])
    })

  }

  editCompanyData():void{
    let newName = this.dataForm.get('name').value;
    let newStreet = this.dataForm.get('street').value;
    let newNum = this.dataForm.get('number').value;
    let newCity = this.dataForm.get('city').value;
    let newCountry = this.dataForm.get('country').value;
    let newAddress = new Address(+newNum,newStreet,newCity,newCountry,-1,-1);
    let newDescription = this.dataForm.get('description').value;
    let newLogo = this.dataForm.get('fileSource').value;

    if(this.rentCarAdminService.editCompanyData(this.rentCarCompany.id,newName,newDescription,newAddress,newLogo)){

      console.log(this.rentCarCompany.address);
      // this.rentCarCompany.name=newName;
      // this.rentCarCompany.address=newAddress;
      // this.rentCarCompany.description=newDescription;
      // this.rentCarCompany.logo = newLogo;
  }

    this.dataForm.reset();
    this.setFormValues();
}

  setFormValues():void{
    this.dataForm.patchValue({
      'name':this.rentCarCompany.name,
      'street':this.rentCarCompany.address.street,
      'number':this.rentCarCompany.address.num,
      'city':this.rentCarCompany.address.city,
      'country':this.rentCarCompany.address.country,
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

  onLogoClick(name:string){
    document.getElementById(name).focus();
  }

}


