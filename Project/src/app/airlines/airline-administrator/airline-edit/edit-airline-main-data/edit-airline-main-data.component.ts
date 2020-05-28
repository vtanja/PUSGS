import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Airline } from 'src/app/models/airline.model';
import { AirlineAdministratorService } from 'src/app/services/airline-administrator.service';
import { Address } from 'src/app/models/address';
import { from } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-edit-airline-main-data',
  templateUrl: './edit-airline-main-data.component.html',
  styleUrls: ['./edit-airline-main-data.component.css']
})
export class EditAirlineMainDataComponent implements OnInit, AfterViewInit {

  dataForm:FormGroup;
  airline:Airline;
  imgPreview:string | ArrayBuffer;
  img='../../../../../assets/images/airlines/';
  
  constructor(private airlineAdministratorService:AirlineAdministratorService, private router:Router) { }


  ngAfterViewInit(): void {
    this.airlineAdministratorService.getAirline().subscribe((res:Airline)=>{
      this.airline = res;
      this.setFormValues();
      this.imgPreview = this.img + this.airline.image;
    }
    );
  }

  ngOnInit(): void {

    this.dataForm = new FormGroup({
      'id':new FormControl('', Validators.required),
        'name': new FormControl('',Validators.required),
        'address':new FormGroup({
          'street' : new FormControl('',Validators.required),
        'number' : new FormControl('',Validators.required),
        'city' : new FormControl('',Validators.required),
        'country' : new FormControl('',Validators.required),
        }),
        'description' : new FormControl('',Validators.required),
        'file': new FormControl('', []),
         'fileSource': new FormControl('', []),
         'logo' : new FormControl('', [])
      })

    this.airlineAdministratorService.getAirline().subscribe((res:Airline)=>{
      this.airline = res;
      console.log(this.airline);
    }
    );

    //this.imgPreview = this.airline.image;
    // this.dataForm = new FormGroup({
    //   'name': new FormControl(this.airline.name,Validators.required),
    //   'street' : new FormControl(this.airline.address.street,Validators.required),
    //   'number' : new FormControl(this.airline.address.num,Validators.required),
    //   'city' : new FormControl(this.airline.address.city,Validators.required),
    //   'country' : new FormControl(this.airline.address.country,Validators.required),
    //   'description' : new FormControl(this.airline.description,Validators.required),
    //   'file': new FormControl('', [Validators.required]),
    //    'fileSource': new FormControl('', [Validators.required])
    // })
  }

  
  editCompanyData():void{


    this.airlineAdministratorService.editCompanyData(this.airline.id, this.dataForm.value).subscribe((res:any)=>{
      Swal.fire({
        text: 'Airline successfully added!',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500,
      });
      this.router.navigate(['/airline-company-data/edit-airline-main-data']);
    }, (err)=>{
      Swal.fire({
        text: 'Error while changing airline data!',
        icon: 'error',
        showConfirmButton: true,
        timer: 1500,
    })});
  

      //console.log(this.airline.address);
      // this.rentCarCompany.name=newName;
      // this.rentCarCompany.address=newAddress;
      // this.rentCarCompany.description=newDescription;
      // this.rentCarCompany.logo = newLogo;
  

    this.dataForm.reset();
    this.setFormValues();
}

setFormValues():void{
  this.dataForm.patchValue({
    'id':this.airline.id,
    'name':this.airline.name,
    'address':{
      'street':this.airline.address.street,
      'number':this.airline.address.num,
      'city':this.airline.address.city,
      'country':this.airline.address.country,
    },
    'description' : this.airline.description,
    'logo':this.airline.image
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
      fileSource: file,
      logo:file.name
    });

  }
}

onLogoClick(name:string){
  document.getElementById(name).focus();
}


}
