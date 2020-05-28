import { Component, OnInit, Input, AfterViewInit, OnDestroy } from '@angular/core';
import { UserService } from '../services/user-service.service';
import { User } from '../models/user';
import { Router, NavigationEnd } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Subscription } from 'rxjs';
import { AirlineService } from '../services/airline.service';
import { Airline } from '../models/airline.model';
import { AirlineAdministratorService } from '../services/airline-administrator.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  loggedIn:boolean=false;
  userName:string = "";
  userRole:string= "";
  invitations:User[]=[];

  isCollapsedRequests:boolean=true;
  mySubscription:Subscription;

  constructor(private userService:UserService,private router:Router , private airlineService:AirlineService, private airlineAdminService:AirlineAdministratorService){

   }


  ngOnInit(): void {


    if(this.userService.isUserLoggedIn()){
        this.loggedIn=true;
        this.getUserData();
        if(this.userService.getUserRole()==='USER'){
          this.invitations = this.getRequests();
        }
        console.log(this.invitations);
    }

    this.userService.userLogged.subscribe((isLogged:boolean)=>{
        if(isLogged){
            this.getUserData();
            this.loggedIn=true;
            if(this.userService.getUserRole()==='USER'){
              this.invitations = this.getRequests();
            }
        }else{
          this.loggedIn=false;
          this.userRole="";
          this.userName="";
        }
    })
  }


  onCompanyDataAndDestinations(){
    this.airlineAdminService.hasAirline().subscribe((res:boolean)=>{
      console.log(res);
      if(res){
        this.router.navigate(['/airline-company-data/edit-airline-main-data']);
      }
      else{
        this.router.navigate(['/airline-admin']);
      }
    })
  }

  getRequests(): User[] {
    let requests:User[]=[];
    this.userService.getFriendRequests().subscribe((res:User[])=>{
      res.forEach(obj=>{
       requests.push(obj);
      })
    });
    return requests;
  }


  onAccept(user:User){
    this.userService.accept(user).subscribe((res:any)=>{
      this.invitations=this.getRequests();
      this.userService.newRequest.next(true);
    })
  }

  onDecline(user:User){
    this.userService.delete(user).subscribe((res:any)=>{
      this.invitations=this.getRequests();
     }
     );
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



}
