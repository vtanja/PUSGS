import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  passwordForm:FormGroup;
  userID:string;
  token:string;
  requestSent:boolean;

  constructor(private userService: UserService,private router:Router,private toastr:ToastrService) {
    this.passwordForm = new FormGroup({
      'password' : new FormControl("",[Validators.required,Validators.pattern(new RegExp("^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{6,}$"))]),
      'confirm':new FormControl("",Validators.required)
    },this.passwordMatchValidator.bind(this))
  }

  ngOnInit(): void {
    this.requestSent = false;
    this.userID = this.getCookie('userID');
    this.token = this.getCookie('token');
  }

  hasRegExpError(controlName:string){

    const control = <FormControl>(this.passwordForm.get(controlName));
    const errors = control.errors;

    if(errors){
      if(errors['pattern'] && control.touched )
         return true;
    }

    return false;

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
    if(this.passwordForm.errors){
      if(this.passwordForm.errors['notMatching'] && this.passwordForm.get('password').touched
      && this.passwordForm.get('confirm').touched )
         return true;
    }

    return false;
  }

  onPasswordSubmit(){
    let data={
      'userID' : this.userID,
      'token' : this.token,
      'newPassword' : this.passwordForm.get('password').value
    }

    this.requestSent=true;
    this.userService.changePassword(data).subscribe(
      res=>{
        this.requestSent=false;
        this.toastr.success('Password successfully changed.');
        this.router.navigateByUrl('/login');
      },
      err=>{
        this.requestSent=false;
        if(err.message=="Password already changed."){
          this.toastr.error('Password already changed');
          this.router.navigateByUrl('/login');
        }else{
          this.toastr.error('Unable to change password.Please try again later.');
        }

      }
    )
  }

  getCookie(cookieName) {
    var cookieValue = document.cookie;
    var cookieStart = cookieValue.indexOf(" " + cookieName + "=");
    if (cookieStart == -1) {
        cookieStart = cookieValue.indexOf("=");
    }
    if (cookieStart == -1) {
        cookieValue = null;
    }
    else {
        cookieStart = cookieValue.indexOf("=", cookieStart) + 1;
        var cookieEnd = cookieValue.indexOf(";", cookieStart);
        if (cookieEnd == -1) {
            cookieEnd = cookieValue.length;
        }
        cookieValue = unescape(cookieValue.substring(cookieStart, cookieEnd));
    }
    return cookieValue;
  }

}
