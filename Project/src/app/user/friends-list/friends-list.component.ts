import { Component, OnInit, ViewChild } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { UserService } from '../userService.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.css']
})



export class FriendsListComponent implements OnInit {
  loggedUser:User;
  filterData: User[]=[];
  filterUser: string='';
  
  sortedData: User[]=[]; 
  
  constructor(private userService:UserService) { 
    this.sortedData = this.userService.getUser().friends.slice();
    console.log(this.sortedData);
  }

  sortData(sort: Sort) {
    const data = this.sortedData.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'firstName': return compare(a.firstName, b.firstName, isAsc);
        case 'lastName': return compare(a.lastName, b.lastName, isAsc);
        case 'accepted': return compare(a.username, b.username, isAsc);
        default: return 0;
      }
    });
  }

  ngOnInit(): void {
    // this.loggedUser=this.userService.getUser();
    // this.filterData.push(...(this.loggedUser.friends))
    // console.log(this.filterData);
  }

}
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}