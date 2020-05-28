import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../services/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm:FormGroup;

  constructor(private userService:UserService,private toastr:ToastrService,private router:Router) {
    this.registerForm = new FormGroup({
      'userName' : new FormControl(null,Validators.required),
      'firstName' : new FormControl(null,Validators.required),
      'lastName' : new FormControl(null,Validators.required),
      'email' : new FormControl(null,[Validators.required,Validators.email]),
      'passwordData' : new FormGroup({
        'password': new FormControl(null,[Validators.required,
        Validators.pattern(new RegExp("^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{6,}$"))]),
        'confirm': new FormControl(null,[Validators.required])
      },this.passwordMatchValidator.bind(this)),
      'address': new FormControl(null,Validators.required),
      'phoneNumber': new FormControl(null,[Validators.required,Validators.pattern(
        new RegExp('(([+][(]?[0-9]{1,3}[)]?)|([(]?[0-9]{4}[)]?))\s*[)]?[-\s\.]?[(]?[0-9]{1,3}[)]?([-\s\.]?[0-9]{3})([-\s\.]?[0-9]{3,4})'))])
    });
  }

  ngOnInit(): void {

    this.resetForm();

  }

   passwordMatchValidator(group: FormGroup): {[s:string]:boolean} {

    if (group) {
      if (group.get('password').value !== group.get('confirm').value) {
        return { 'notMatching' : true };
      }
    }

    return null;
  }

  doPasswordsMatch(){
    if(this.registerForm.get('passwordData').errors){
      if(this.registerForm.get('passwordData').errors['notMatching'] && this.registerForm.get('passwordData.password').touched && this.registerForm.get('passwordData.confirm').touched )
         return true;
    }

    return false;
  }

  onCountryChange(event:any){
   this.registerForm.get('phoneNumber').setValue(event['dialCode']);
  }

  hasRegExpError(controlName:string){

    const control = <FormControl>(this.registerForm.get(controlName));
    const errors = control.errors;

    if(errors){
      if(errors['pattern'] && control.touched )
         return true;
    }

    return false;

  }

  hasRequiredError(controlName:string){

    const control = <FormControl>(this.registerForm.get(controlName));
    const errors = control.errors;

    if(errors){
      if(errors['required'] && control.touched )
         return true;
    }

    return false;

  }

  hasEmailError(controlName:string){

    const control = <FormControl>(this.registerForm.get(controlName));
    const errors = control.errors;

  if(errors){
    if(errors['email'] && control.touched )
       return true;
  }

  return false;

}

  onRegister():void{

    let userData;

    userData = {
      'UserName' : this.registerForm.get('userName').value,
      'FirstName' : this.registerForm.get('firstName').value,
      'LastName' : this.registerForm.get('lastName').value,
      'Password' : this.registerForm.get('passwordData.password').value,
      'Email' : this.registerForm.get('email').value,
      'Address' : this.registerForm.get('address').value,
      'PhoneNumber' : this.registerForm.get('phoneNumber').value,
    }

    this.userService.register(userData).subscribe(
      (res:any) => {
        if(res.succeeded){
          this.resetForm();
          this.toastr.success('New user added!','Registration successfull');
          this.router.navigateByUrl('/login');
        }else{
          res.errors.forEach(error => {
            switch(error.code){
              case 'DuplicateUserName':
                this.toastr.error('Username already exists!','Registration failed');
                break;
              default:
                this.toastr.error(error.description,'Registration failed');
                break;
            }
          });
        }
      }
    )

  }

  resetForm():void{
    this.registerForm.reset();
    this.registerForm.patchValue({
      'phoneNumber' : 381
    })
  }

}
