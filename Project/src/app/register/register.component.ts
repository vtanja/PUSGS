import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm:FormGroup;

  constructor() { }

  ngOnInit(): void {

    this.registerForm = new FormGroup({
      'username' : new FormControl(null,Validators.required),
      'firstName' : new FormControl(null,Validators.required),
      'lastName' : new FormControl(null,Validators.required),
      'email' : new FormControl(null,[Validators.required,Validators.email]),
      'passwordData' : new FormGroup({
        'password': new FormControl(null,[Validators.required,
        Validators.pattern(new RegExp("^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"))]),
        'confirm': new FormControl(null,[Validators.required])
      },this.passwordMatchValidator.bind(this)),
      'city': new FormControl(null,Validators.required),
      'phone': new FormControl(null,[Validators.required,Validators.pattern(
        new RegExp('(([+][(]?[0-9]{1,3}[)]?)|([(]?[0-9]{4}[)]?))\s*[)]?[-\s\.]?[(]?[0-9]{1,3}[)]?([-\s\.]?[0-9]{3})([-\s\.]?[0-9]{3,4})'))])
    });

    console.log(this.registerForm);
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
   this.registerForm.get('phone').setValue(event['dialCode']);
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


}
