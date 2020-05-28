import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Address } from 'src/app/models/address';
import { AirlineAdministratorService } from 'src/app/services/airline-administrator.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-airline',
  templateUrl: './add-airline.component.html',
  styleUrls: ['./add-airline.component.css']
})
export class AddAirlineComponent implements OnInit {
  dataForm:FormGroup;
  imgPreview:string|ArrayBuffer;
  img= '../../../../../assets/images/airlines/';
  constructor(private airlineAdminService:AirlineAdministratorService, private router:Router) { }

  ngOnInit(): void {
    this.imgPreview = '';
    this.dataForm = new FormGroup({
      name: new FormControl('',Validators.required),
      address:new FormGroup({
        street : new FormControl('',Validators.required),
        number : new FormControl('',Validators.required),
        city : new FormControl('',Validators.required),
        country : new FormControl('',Validators.required),
      }),
      description : new FormControl('',Validators.required),
      file: new FormControl('', [Validators.required]),
       fileSource: new FormControl('', [Validators.required]),
       logo:new FormControl('')
    })
  }

  addAirline():void{
    this.airlineAdminService.addAirline(this.dataForm.value).subscribe((res:any)=>{
      Swal.fire({
        text: 'Airline successfully added!',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500,
      });
      this.router.navigate(['/airline-company-data/edit-airline-main-data']);
    }, err=>{
      Swal.fire({
        text: 'Error while adding airline!',
        icon: 'error',
        showConfirmButton: true,
        timer: 1500,
      });
    }
    );

    this.dataForm.reset();
    
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
        logo: file.name
      });
  
    }
  }
  
  onLogoClick(name:string){
    document.getElementById(name).focus();
  }
}
