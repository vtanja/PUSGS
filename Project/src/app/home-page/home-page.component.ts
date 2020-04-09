import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../userService.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent  {

  logged:boolean=false;


  constructor(private userService:UserService) {
  }

  ngOnInit(): void {
    // this.userService.isLogged.subscribe(
    //   (isLogged: boolean)=>{
    //     this.logged=isLogged;
    //   });

  }

}
