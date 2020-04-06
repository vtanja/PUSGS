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
        'password': new FormControl(null,[Validators.required]),
        'confirm': new FormControl(null,[Validators.required])
      },this.passwordMatchValidator),
      'city': new FormControl(null,Validators.required),
      'phone': new FormControl(null,[Validators.required,Validators.pattern(
        new RegExp('(([+][(]?[0-9]{1,3}[)]?)|([(]?[0-9]{4}[)]?))\s*[)]?[-\s\.]?[(]?[0-9]{1,3}[)]?([-\s\.]?[0-9]{3})([-\s\.]?[0-9]{3,4})'))])
    });
  }

   passwordMatchValidator(group: FormGroup): any {

    if (group) {
      if (group.get('password').value !== group.get('confirm').value) {
        return { notMatching : true };
      }
    }

    return null;
  }



}
