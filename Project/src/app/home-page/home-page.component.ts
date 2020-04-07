import { Component, OnInit } from '@angular/core';
import { UserService } from '../userService.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  
  loggedIn=false;
  username='';

  constructor(private userService:UserService) { }

  ngOnInit(): void {
      this.userService.userLogged.subscribe(
        (username: string)=>{
          this.loggedIn=true;
          this.username=username;
          console.log(this.loggedIn + 'logged from home page' + this.username);
        }
      );
    
  }

}
