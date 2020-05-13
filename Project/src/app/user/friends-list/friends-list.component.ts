import { Component, OnInit, ViewChild } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { UserService } from '../../services/user-service.service';
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
  public imgSource = "https://randomuser.me/api/portraits/men/1.jpg";
   public bgColor = "#0375be";
  public color = "black";
  public isCircular = true;

  constructor(private userService:UserService) {
    this.sortedData = this.userService.getLoggedUser().friends.slice();
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
     this.loggedUser=this.userService.getLoggedUser();
    // this.filterData.push(...(this.loggedUser.friends))
    // console.log(this.filterData);
  }

  removeUser(user:User){
    const index = this.loggedUser.friends.indexOf(user);
    if(index>-1){
      this.loggedUser.friends.splice(index,1);
    }

    this.sortedData.splice(index,1); 

    const index2=user.friends.indexOf(this.loggedUser);
    if(index2>-1){
      user.friends.splice(index2,1);
    }

    console.log('removed');
  }

}
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
