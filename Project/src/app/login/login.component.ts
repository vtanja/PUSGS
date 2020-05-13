import { Component, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;

  constructor(private userService:UserService, private route:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'username': new FormControl(null,Validators.required),
      'password' : new FormControl(null,Validators.required)
    });
  }

  onLogin(){

    if(this.userService.login(this.loginForm.get('username').value,this.loginForm.get('password').value)){

        this.router.navigate(['/home'], {relativeTo:this.route});
    }

  }

}
