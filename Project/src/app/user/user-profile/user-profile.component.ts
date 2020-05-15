import { Component, OnInit, } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../services/user-service.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  editForm:FormGroup;
  profileImage:string | ArrayBuffer;
  
  loggedUser:User;

  fileToUpload: File = null;

  constructor(private userService:UserService) {
    this.loggedUser=this.userService.getLoggedUser();
  }

  ngOnInit(): void {
    this.editForm = new FormGroup({
      'firstName': new FormControl(null,Validators.required),
      'lastName' : new FormControl(null,Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'phone': new FormControl(null, [Validators.required, Validators.pattern(new RegExp('(([+][(]?[0-9]{1,3}[)]?)|([(]?[0-9]{4}[)]?))\s*[)]?[-\s\.]?[(]?[0-9]{1,3}[)]?([-\s\.]?[0-9]{3})([-\s\.]?[0-9]{3,4})'))]),
      'address': new FormControl(null, Validators.required),
      'file': new FormControl('', [Validators.required]),
      'passwordData' : new FormGroup({
          'password': new FormControl(null,[Validators.required,
            Validators.pattern(new RegExp("^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{8,}$"))]),
          'confirm': new FormControl(null,[Validators.required])

        },this.passwordMatchValidator.bind(this)),

    });



    this.editForm.setValue({
      'firstName':this.loggedUser.firstName,
      'lastName': this.loggedUser.lastName,
      'passwordData':{
        password:this.loggedUser.password,
        confirm:this.loggedUser.password
      },
      'email': this.loggedUser.email,
      'phone': this.loggedUser.phoneNumber,
      'address': this.loggedUser.address,
    });

    this.profileImage=this.loggedUser.profileImage;
    console.log(this.editForm);
  }

  onFileChange(event) {

    if (event.target.files.length > 0) {

      const file = event.target.files[0];

      if (file.type.match('image\/*') == null) {
      console.log("Not supported");
        return;
      }

      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        this.profileImage = reader.result;
        console.log(this.profileImage);
      }

      this.editForm.patchValue({
        fileSource: file
      });

    }
  }

  onLogoClick(name:string){
    document.getElementById(name).focus();
  }

  onCountryChange(event:any){
    this.editForm.get('phone').setValue(event['dialCode']);
   }

  hasRequiredError(controlName:string){

    const control = <FormControl>(this.editForm.get(controlName));
    const errors = control.errors;

    if(errors){
      if(errors['required'] && control.touched )
         return true;
    }

    return false;

  }

  doPasswordsMatch(){
    if(this.editForm.get('passwordData').errors){
      if(this.editForm.get('passwordData').errors['notMatching'] && this.editForm.get('passwordData.password').touched && this.editForm.get('passwordData.confirm').touched )
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


  hasRegExpError(controlName:string){

    const control = <FormControl>(this.editForm.get(controlName));
    const errors = control.errors;

    if(errors){
      if(errors['pattern'] && control.touched )
         return true;
    }

    return false;

  }


  onSaveChanges(){

  }


}
