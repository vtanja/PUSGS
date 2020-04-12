import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-profile-navbar',
  templateUrl: './profile-navbar.component.html',
  styleUrls: ['./profile-navbar.component.css']
})
export class ProfileNavbarComponent implements OnInit {

  @Input('company') company;
  constructor() { }

  ngOnInit(): void {
    console.log(this.company);
  }

}
