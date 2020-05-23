import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AdministratorService } from 'src/app/services/administrator.service';
import { User } from 'src/app/models/user';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {


  addUserForm:FormGroup;

  constructor(private administratorService:AdministratorService,private userService:UserService,private router:Router) {

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

    let userData;

    userData = {
      'UserName' : this.addUserForm.get('username').value,
      'FirstName' : this.addUserForm.get('firstName').value,
      'LastName' : this.addUserForm.get('lastName').value,
      'Password' : this.addUserForm.get('password').value,
      'Email' : this.addUserForm.get('email').value,
      'Address' : this.addUserForm.get('city').value,
      'PhoneNumber' : this.addUserForm.get('phone').value,
      'UserRole' : this.addUserForm.get('adminType').value
    }

    if(userData.UserRole === 'RENTCARADMIN'){
    this.administratorService.addRentCarAdmin(userData).subscribe(

     res => {
      this.clearForm();
      Swal.fire({
            text: 'Administrator successfully added!',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500,
          });
          if(userData.UserRole==='RENTCARADMIN')
            this.router.navigateByUrl('/all-users/rent-car');
          else
            this.router.navigateByUrl('/all-users/airline');
     },
      err => {
        Swal.fire({
              text: err.error.message,
              icon: 'error',
              showConfirmButton: true,
              confirmButtonColor: "#de8e26"
            });
      });
    }else{
      this.administratorService.addAirlineAdmin(userData).subscribe(

        res => {
      this.clearForm();
      Swal.fire({
            text: 'Administrator successfully added!',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500,
          });
          if(userData.UserRole==='RENTCARADMIN')
            this.router.navigateByUrl('/rent-car-admins');
          else
            this.router.navigateByUrl('/airline-admins');
     },
      err => {
        Swal.fire({
              text: err.error.message,
              icon: 'error',
              showConfirmButton: true,
              confirmButtonColor: "#de8e26"
            });
      });
    }
  }

  clearForm():void{
    this.addUserForm.reset();
  }

}
