import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../services/user-service.service';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loggedIn:boolean=false;
  userName:string = "";
  userRole:string= "";
  loggedUser:User;
  isCollapsedRequests:boolean=true;

  constructor(private userService:UserService,private router:Router) { }

  ngOnInit(): void {


    if(this.userService.isUserLoggedIn()){
        this.loggedIn=true;
        this.getUserData();
    }

    this.userService.userLogged.subscribe((isLogged:boolean)=>{
        if(isLogged){
            this.getUserData();
            this.loggedIn=true;

        }else{
          this.loggedIn=false;
          this.userRole="";
          this.userName="";
        }
    })
  }

  getUserData():void{
    this.userRole = this.userService.getUserRole();
    this.userName = this.userService.getUserName();
  }

  onLogout():void{
    if(this.userService.logout()){
      this.router.navigate(['/home']);
    }

  }

  onAccept(user:User){
    // const toAddIndex = this.loggedUser.friendRequests.indexOf(user);
    // if(toAddIndex>-1){
    //   this.loggedUser.friendRequests.splice(toAddIndex, 1);
    // }
    // this.loggedUser.friends.push(user);
    // user.friends.push(this.loggedUser);
  }

  onDecline(user:User){
    // const toRemoveIndex = this.loggedUser.friendRequests.indexOf(user);
    // if(toRemoveIndex>-1){
    //   this.loggedUser.friendRequests.splice(toRemoveIndex, 1);
    // }
  }




}
