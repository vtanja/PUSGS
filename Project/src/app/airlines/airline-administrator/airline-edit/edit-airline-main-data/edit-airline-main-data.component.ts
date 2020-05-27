import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Airline } from 'src/app/models/airline.model';
import { AirlineAdministratorService } from 'src/app/services/airline-administrator.service';
import { Address } from 'src/app/models/address';
@Component({
  selector: 'app-edit-airline-main-data',
  templateUrl: './edit-airline-main-data.component.html',
  styleUrls: ['./edit-airline-main-data.component.css']
})
export class EditAirlineMainDataComponent implements OnInit {

  dataForm:FormGroup;
  airline:Airline;
  imgPreview:string | ArrayBuffer;

  constructor(private airlineAdministratorService:AirlineAdministratorService) { }

  ngOnInit(): void {
    this.airline=this.airlineAdministratorService.getAirline();
    this.imgPreview = this.airline.image;
    this.dataForm = new FormGroup({
      'name': new FormControl(this.airline.name,Validators.required),
      'street' : new FormControl(this.airline.address.street,Validators.required),
      'number' : new FormControl(this.airline.address.num,Validators.required),
      'city' : new FormControl(this.airline.address.city,Validators.required),
      'country' : new FormControl(this.airline.address.country,Validators.required),
      'description' : new FormControl(this.airline.description,Validators.required),
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
    let newAddress = new Address(-1,+newNum,newStreet,newCity,newCountry,-1,-1);
    let newDescription = this.dataForm.get('description').value;
    let newLogo = this.dataForm.get('fileSource').value;

    if(this.airlineAdministratorService.editCompanyData(this.airline.id,newName,newDescription,newAddress,newLogo)){

      console.log(this.airline.address);
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
    'name':this.airline.name,
    'street':this.airline.address.street,
    'number':this.airline.address.num,
    'city':this.airline.address.city,
    'country':this.airline.address.country,
    'description' : this.airline.description
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
