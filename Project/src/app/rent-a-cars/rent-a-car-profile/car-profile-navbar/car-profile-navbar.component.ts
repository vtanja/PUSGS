import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-car-profile-navbar',
  templateUrl: './car-profile-navbar.component.html',
  styleUrls: ['./car-profile-navbar.component.css']
})
export class CarProfileNavbarComponent implements OnInit {

  @Input('company') company;
  constructor() { }

  ngOnInit(): void {
  }

}
