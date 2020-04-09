import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../user/userService.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  username:string ='';
  loggedIn:boolean=false;

  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.userService.userLogged.subscribe(
      (username: string)=>{
        this.loggedIn=true;
        this.username=username;
      });
  }


}
