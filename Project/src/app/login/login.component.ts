import { Component, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;

  constructor(private userService:UserService, private route:ActivatedRoute, private router:Router,private toastr:ToastrService) {

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
        if(err.status===400){
          this.toastr.error('Incorrect username or password','Login failed.');
        }
        else if(err.status===401){
          console.log(err.message);
          this.toastr.error('Email not confirmed.','Login failed.');
        }
        else{
         console.log("error");
        }

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

}
