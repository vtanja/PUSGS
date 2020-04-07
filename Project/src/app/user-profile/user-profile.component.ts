import { Component, OnInit, } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  editForm:FormGroup;
  firstNameReadonly:boolean=true;
  lastNameReadonly:boolean=true;
  emailReadonly:boolean=true;
  phoneReadonly:boolean=true;
  addressReadonly:boolean=true;

  constructor() { }

  ngOnInit(): void {
    this.editForm = new FormGroup({
      'firstName': new FormControl(null,Validators.required),
      'lastName' : new FormControl(null,Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'phone': new FormControl(null, [Validators.required, Validators.pattern(new RegExp('(([+][(]?[0-9]{1,3}[)]?)|([(]?[0-9]{4}[)]?))\s*[)]?[-\s\.]?[(]?[0-9]{1,3}[)]?([-\s\.]?[0-9]{3})([-\s\.]?[0-9]{3,4})'))]),
      'address': new FormControl(null, Validators.required)
    });

    this.editForm.setValue({
      'firstName':'Pera',
      'lastName': 'Peric',
      'email': 'pera@pera.com',
      'phone': '+38111111111',
      'address': 'Ulica ulicic 1, Grad'
    });
  }

  onSaveChanges(){

  }

  onEdit(control: string){
    if(control==='firstName'){
      this.firstNameReadonly=false;
    }
    else if(control === 'lastName'){
      this.lastNameReadonly=false;
    }
    else if(control === 'email'){
      this.emailReadonly=false;   
    }
    else if(control === 'phone'){
      this.phoneReadonly=false;
    }
    else if(control === 'address'){
      this.addressReadonly=false;
    }
  }

}
