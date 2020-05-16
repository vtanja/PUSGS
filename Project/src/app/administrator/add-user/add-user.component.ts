import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AdministratorService } from 'src/app/services/administrator.service';
import { User } from 'src/app/models/user';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {


  addUserForm:FormGroup;

  constructor(private administratorService:AdministratorService,private router:Router) {

    this.addUserForm = new FormGroup({

        'username' : new FormControl(null,Validators.required),
        'firstName' : new FormControl(null,Validators.required),
        'lastName' : new FormControl(null,Validators.required),
        'adminType' : new FormControl('',Validators.required),
        'email' : new FormControl(null,[Validators.required,Validators.email]),
        'password': new FormControl(null,Validators.required),
        'city': new FormControl(null,Validators.required),
        'phone': new FormControl(null,[Validators.required,Validators.pattern(
          new RegExp('(([+][(]?[0-9]{1,3}[)]?)|([(]?[0-9]{4}[)]?))\s*[)]?[-\s\.]?[(]?[0-9]{1,3}[)]?([-\s\.]?[0-9]{3})([-\s\.]?[0-9]{3,4})'))])
    });
  }

  ngOnInit(): void {
  }

  hasRegExpError(controlName:string){

    const control = <FormControl>(this.addUserForm.get(controlName));
    const errors = control.errors;

    if(errors){
      if(errors['pattern'] && control.touched )
         return true;
    }

    return false;

  }

  hasRequiredError(controlName:string){

    const control = <FormControl>(this.addUserForm.get(controlName));
    const errors = control.errors;

    if(errors){
      if(errors['required'] && control.touched )
         return true;
    }

    return false;

  }

  hasEmailError(controlName:string){

    const control = <FormControl>(this.addUserForm.get(controlName));
    const errors = control.errors;

  if(errors){
    if(errors['email'] && control.touched )
       return true;
  }

  return false;

  }

  onCountryChange(event:any){
  this.addUserForm.get('phone').setValue(event['dialCode']);
  }

  onAddAdmin():void{

    let username = this.addUserForm.get('username').value;
    let firstName = this.addUserForm.get('firstName').value;
    let lastName = this.addUserForm.get('lastName').value;
    let adminType = this.addUserForm.get('adminType').value;
    let email = this.addUserForm.get('email').value;
    let password = this.addUserForm.get('password').value;
    let city = this.addUserForm.get('city').value;
    let phone = this.addUserForm.get('phone').value;


    let newUser:User = new User(firstName,lastName,email,adminType,username,password,phone,city,[]);

    if(this.administratorService.addAdministrator(newUser)){

      this.clearForm();

      Swal.fire({
        text: 'User successfully added!',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500,
      });

      this.router.navigateByUrl('/all-users');
    }else{
      Swal.fire({
        text: 'Unable to add user!',
        icon: 'error',
        showConfirmButton: true,
        confirmButtonColor: "#de8e26"
      });
  }
}

  clearForm():void{

    this.addUserForm.reset();
    this.addUserForm.patchValue({

      'username' : null,
        'firstName' : null,
        'lastName' : null,
        'adminType' : '',
        'email' : null,
        'password': null,
        'city': null,
        'phone': null
    })
  }

}
