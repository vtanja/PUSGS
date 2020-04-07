import { Component, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../userService.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;
  loggedIn=false;
  loggedUsername='';

  constructor(private userService:UserService, private route:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'username': new FormControl(null,Validators.required),
      'password' : new FormControl(null,Validators.required)
    });
  }

  onLogin(){
    this.loggedIn=true;
    this.loggedUsername=this.loginForm.get('username').value;

    if(this.loggedIn){
      this.userService.userLogged.next(this.loggedUsername);
      this.userService.isLogged.next(true);
    }
    this.router.navigate(['/home'], {relativeTo:this.route});

      
  }

}
