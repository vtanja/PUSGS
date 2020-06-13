import { Component, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'angularx-social-login';
import {
  FacebookLoginProvider,
  GoogleLoginProvider,
} from 'angularx-social-login';
import { RentCarService } from '../../services/rent-a-car.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  requestSent:boolean;

  constructor(
    private userService: UserService,
    private rentCarService: RentCarService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    public OAuth: AuthService
  ) {
    this.loginForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });
  }

  ngOnInit(): void {
    this.loginForm.reset();
    this.requestSent = false;

    if (this.userService.isUserLoggedIn()) {
      this.router.navigate(['/user/profile'], { relativeTo: this.route });
    }
  }

  onLogin() {
    let loginData = {
      UserName: this.loginForm.get('username').value,
      Password: this.loginForm.get('password').value,
    };

    this.requestSent = true;
    this.userService.login(loginData).subscribe(
      (res: any) => {
        this.requestSent = false;
        localStorage.setItem('token', res.token);
        this.userService.userLogged.next(true);
        this.loginForm.reset();
        this.navigate();
      },
      (err) => {
        this.requestSent = false;
        if (err.status != 0) this.toastr.error(err.error.message);
      }
    );
  }

  logInWithFacebook(): void {
    this.OAuth.signIn(FacebookLoginProvider.PROVIDER_ID).then((socialusers) => {
      this.userService.facebookLogin(socialusers).subscribe(
        (res: any) => {
          localStorage.setItem('token', res.token);
          this.userService.userLogged.next(true);
          this.loginForm.reset();
          this.router.navigateByUrl('/home');
        },

        (err) => {
          this.toastr.error(err.error.message);
        }
      );
    });
  }

  logInWithGoogle(): void {
    this.OAuth.signIn(GoogleLoginProvider.PROVIDER_ID).then((socialusers) => {
      this.userService.googleLogin(socialusers).subscribe(
        (res: any) => {
          localStorage.setItem('token', res.token);
          this.userService.userLogged.next(true);
          this.loginForm.reset();
          this.router.navigateByUrl('/home');
        },

        (err) => {
          this.toastr.error(err.error.message);
        }
      );
    });
  }

  navigate() {
    let role = this.userService.getUserRole();

    if (role === 'USER') {
      this.router.navigate(['/home'], { relativeTo: this.route });
    } else if (role === 'ADMINISTRATOR') {
      this.router.navigate(['/admin-home']);
    } else if (role === 'RENTCARADMIN') {
      this.userService.userHasCompany().subscribe((data: any) => {
        let companyExists = data.hasCompany;

        if (companyExists) {
          this.router.navigate(['/rent-car-admin-home/chart-bar']);
        } else {
          this.router.navigate(['/add-first']);
        }
      });
    } else if(role === 'AIRLINEADMIN'){
      this.userService.hasAirline().subscribe((data: any) => {
        if(data){
          this.router.navigate(['/airline-admin-home/airline-chart-bar']);
        }
        else{
          this.router.navigate(['/airline-admin']);
        }
      });
    }
  }
}
