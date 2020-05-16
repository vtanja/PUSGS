import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AdministratorService } from 'src/app/services/administrator.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  users:User[];

  constructor(private administratorService:AdministratorService) { }

  ngOnInit(): void {

    this.users = this.administratorService.getAllUsers();
  }

}
