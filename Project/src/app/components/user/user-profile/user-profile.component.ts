import { Component, OnInit, AfterViewInit, } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../../services/user-service.service';
import { User } from 'src/app/models/user';
import { UserAdapter } from 'src/app/models/adapters/user.adapter';
import { ToastrService } from 'ngx-toastr';
import { LoginComponent } from 'src/app/components/login/login.component'
import { file } from 'jszip';

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
  readonly img = '../../../../assets/images/';
  isDataLoaded:boolean=false;
  constructor(private userService:UserService, private toastr:ToastrService) {
    //this.profileImage = this.img+'profilna.png';
    this.editForm = new FormGroup({
      'firstName': new FormControl(null,Validators.required),
      'lastName' : new FormControl(null,Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'phone': new FormControl(null, [Validators.required, Validators.pattern(new RegExp('(([+][(]?[0-9]{1,3}[)]?)|([(]?[0-9]{4}[)]?))\s*[)]?[-\s\.]?[(]?[0-9]{1,3}[)]?([-\s\.]?[0-9]{3})([-\s\.]?[0-9]{3,4})'))]),
      'address': new FormControl(null, Validators.required),
      'file': new FormControl('', []),
      'logo': new FormControl('', []),
      'profileImage': new FormControl('', []),
      'passwordData' : new FormGroup({
         'password': new FormControl('',[
           Validators.pattern(new RegExp("^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{8,}$"))]),
          'confirm': new FormControl('')

        },this.passwordMatchValidator.bind(this)),

    });
  }


  ngOnInit(): void {
    this.isDataLoaded = false;
    this.userService.getUserProfile().subscribe((res:any)=>{
        this.loggedUser=res;
        this.editForm.reset();
        this.setFormValues();
        this.isDataLoaded = true;
        console.log(this.loggedUser);
        if(this.loggedUser.profileImage!==null && this.loggedUser.profileImage!==""){
          this.profileImage = this.img+this.loggedUser.profileImage;
        }
        else{
          this.profileImage = this.img+'profilna.png';
        }
    });

    // if(this.loggedUser!==undefined && (this.loggedUser.profileImage===null || this.loggedUser.profileImage==="")){
    //   this.profileImage = this.img+'profilna.png';
    // }

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
        this.editForm.patchValue({
          fileSource: file,
          logo:file.name
        });
        
        console.log(this.editForm);
      }


      //this.profileImage =this.img + this.editForm.get('file').value.name;

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

  setFormValues(){
    this.editForm.patchValue({
      'firstName':this.loggedUser.firstName,
      'lastName': this.loggedUser.lastName,
      'email': this.loggedUser.email,
      'phone': this.loggedUser.phoneNumber,
      'address': this.loggedUser.address,
      'profileImage' : this.loggedUser.profileImage
    });
  }

  onSaveChanges(){
    let username:string = this.userService.getUserName();
    var user :{} =
            {
                UserName: username,
                Email : this.editForm.get('email').value,
                FirstName: this.editForm.get('firstName').value,
                LastName : this.editForm.get('lastName').value,
                Address : this.editForm.get('address').value,
                PhoneNumber :this.editForm.get('phone').value,
                ProfileImage: this.editForm.get('logo').value,
                Password : this.editForm.get('passwordData.password').value,
                Id: this.userService.getUserId()
            };


    this.userService.updateProfile(user).subscribe((res:any)=>{
      
      this.toastr.success('Successfully updated profile!', "Success!");
      this.userService.getUserProfile().subscribe((result:any)=>{
        this.loggedUser=result;
        this.editForm.reset();
        this.setFormValues();
        if(this.loggedUser.profileImage!==null && this.loggedUser.profileImage!==""){
          this.profileImage = this.img + this.loggedUser.profileImage;
        }
        else{
          this.profileImage = this.img + 'profilna.png';
        }
      })
    }, (err)=>{
      this.toastr.error('Error while updating profile!', "Success!");
    });
  }


}
