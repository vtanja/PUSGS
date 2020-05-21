import { Component, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;

  constructor(private userService:UserService, private route:ActivatedRoute,
            private router:Router,private toastr:ToastrService,public OAuth:AuthService) {

    this.loginForm = new FormGroup({
      'username': new FormControl(null,Validators.required),
      'password' : new FormControl(null,Validators.required)
    });

  }

  ngOnInit(): void {

    this.loginForm.reset();

    if(this.userService.isUserLogged()){
      this.router.navigate(['/user/profile'], {relativeTo:this.route});
    }

  }

  onLogin(){

    let loginData ={
      'UserName' : this.loginForm.get('username').value,
      'Password' : this.loginForm.get('password').value
    }

    this.userService.login(loginData).subscribe((res:any)=>{

        localStorage.setItem('token', res.token);
        this.userService.userLogged.next(true);
        this.loginForm.reset();
        this.router.navigateByUrl('/home');
    },

      err => {
        this.checkError(err);

    })

    //   let userRole = this.userService.getLoggedUser().role;
    //   if(userRole==='USER'){
    //     this.router.navigate(['/home'], {relativeTo:this.route});
    //   } else if(userRole === 'CARADMIN'){
    //     this.router.navigate(['/user/profile'], {relativeTo:this.route});
    //   } else if( userRole === 'ADMINISTRATOR'){
    //     this.router.navigate(['/all-users'], {relativeTo:this.route});
    //   }
    // }else{
    //   console.log('FALSE');
    // }

  }

  logInWithFacebook():void{

    this.OAuth.signIn(FacebookLoginProvider.PROVIDER_ID).then(socialusers => {
      console.log(socialusers);
      this.userService.facebookLogin(socialusers).subscribe((res:any)=>{

        localStorage.setItem('token', res.token);
        this.userService.userLogged.next(true);
        this.loginForm.reset();
        this.router.navigateByUrl('/home');
    },

      err => {
        this.checkError(err);

    });
    });
  }

  logInWithGoogle():void{

    this.OAuth.signIn(GoogleLoginProvider.PROVIDER_ID).then(socialusers => {
      this.userService.googleLogin(socialusers).subscribe((res:any)=>{

        localStorage.setItem('token', res.token);
        this.userService.userLogged.next(true);
        this.loginForm.reset();
        this.router.navigateByUrl('/home');
    },

      err => {
        this.checkError(err);

    });
    });

    }

  checkError(err:any){
    if(err.status===400){
      this.toastr.error('There is another account using that email address.','Login failed.');
    }
    else if(err.status===401){
      this.toastr.error('Information provided are not valid.','Login failed.');
    }
    else{
      this.toastr.error('An error occured.Please try again later','Login failed.');
    }
  }
  }


