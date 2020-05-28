import { Component, OnInit } from '@angular/core';
import { FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { RentCarService } from 'src/app/services/rent-a-car.service';
import { RentCar } from 'src/app/models/rent-a-car.model';
import { RentCarAdministratorService } from 'src/app/services/rent-car-administrator.service';
import { Address } from 'src/app/models/address';
import { RentCarAdapter } from 'src/app/models/adapters/rent-a-car.adapter';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-main-data-edit',
  templateUrl: './main-data-edit.component.html',
  styleUrls: ['./main-data-edit.component.css']
})
export class MainDataEditComponent implements OnInit {

  dataForm:FormGroup;
  rentCarCompany:RentCar;
  imgPreview:string | ArrayBuffer;

  constructor(private rentCarService:RentCarService,private rentCarAdapter:RentCarAdapter) {
    this.dataForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      address: new FormGroup({
        street: new FormControl(null, Validators.required),
        number: new FormControl(null, Validators.required),
        city: new FormControl(null, Validators.required),
        country: new FormControl(null, Validators.required),
      }),
      description: new FormControl(null, Validators.required),
      file: new FormControl(''),
      fileSource: new FormControl(''),
      logo: new FormControl('')
    });
   }

  ngOnInit(): void {

    this.rentCarService.getRentCarMainData().subscribe(
      res => {
        this.rentCarCompany = this.rentCarAdapter.adapt(res);
        this.setFormValues();
      },
      err => {}
    )
  }

  editCompanyData():void{
    let data = this.dataForm.value;
    data["id"] = this.rentCarCompany.id;
    data["address"]["addressId"] = this.rentCarCompany.address.addressId;
    delete (data["file"]);
    delete (data["fileSource"]);

    this.rentCarService.editCompanyMainData(this.rentCarCompany.id,data).subscribe(
      res => {
        Swal.fire({
          text : 'Data successfully updated.',
          icon: 'success',
          timer: 1500,
          showConfirmButton:false
        })
      },
      err => {
        Swal.fire({
          title : 'Unable to update data.',
          text : err.message,
          icon: 'error',
          timer: 1500,
          showConfirmButton:false
        })
        this.setFormValues();
      }
    )

}

  setFormValues():void{

    this.imgPreview = this.rentCarCompany.logo;

    this.dataForm.patchValue({
      'name':this.rentCarCompany.name,
      'address.street':this.rentCarCompany.address.street,
      'address.number':this.rentCarCompany.address.num,
      'address.city':this.rentCarCompany.address.city,
      'address.country':this.rentCarCompany.address.country,
      'description' : this.rentCarCompany.description,
      'logo' : this.rentCarCompany.logo
    })

    this.dataForm.get('address').patchValue({
      'street':this.rentCarCompany.address.street,
      'number':this.rentCarCompany.address.num,
      'city':this.rentCarCompany.address.city,
      'country':this.rentCarCompany.address.country,
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

        this.dataForm.patchValue({
          fileSource: file,
          logo: reader.result
        });
      }



    }
  }

  onLogoClick(name:string){
    document.getElementById(name).focus();
  }

}


