import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AdministratorService } from 'src/app/services/administrator.service';

@Component({
  selector: 'app-airline-admins',
  templateUrl: './airline-admins.component.html',
  styleUrls: ['./airline-admins.component.css']
})
export class AirlineAdminsComponent implements OnInit {

  users:User[];
  constructor(private administratorService:AdministratorService) { }

  ngOnInit(): void {
    this.administratorService.getAllAirlineAdmins().subscribe(
      res =>{
        this.users = res;
      },
      err => {}
    )
  }
}
