import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AdministratorService } from 'src/app/services/administrator.service';

@Component({
  selector: 'app-rent-car-admins',
  templateUrl: './rent-car-admins.component.html',
  styleUrls: ['./rent-car-admins.component.css']
})
export class RentCarAdminsComponent implements OnInit {

  users:User[];
  constructor(private administratorService:AdministratorService) { }

  ngOnInit(): void {
    this.administratorService.getAllRentCarAdmins().subscribe(
      res =>{
        this.users = res;
      },
      err => {}
    )
  }

}
