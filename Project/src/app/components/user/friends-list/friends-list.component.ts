import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { UserService } from '../../../services/user-service.service';
import { User } from 'src/app/models/user';
import { FormControl, FormGroup } from '@angular/forms';
import { ReplaySubject, Subject } from 'rxjs';
import { MatSelect } from '@angular/material/select';
import { takeUntil } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.css']
})



export class FriendsListComponent implements OnInit, AfterViewInit{
  loggedUser:User;
  filterUser: string='';


  sortedData: User[]=[];
  public imgSource = "https://randomuser.me/api/portraits/men/1.jpg";
   public bgColor = "#0375be";
  public color = "black";
  public isCircular = true;

   users: User[] = [];
   selected: string;

   invitations:User[];

  constructor(private userService:UserService, private toastr:ToastrService, private httpClient:HttpClient) {

  }

  ngAfterViewInit(): void {
    this.userService.newRequest.subscribe(()=>{
      console.log('users changed');
      this.sortedData=this.getFriends();
      console.log(this.sortedData);

    })
  }


  ngOnInit(): void {
    this.users = this.getAllUsers();
    this.sortedData = this.getFriends();
  }


  getFriends():User[]{

    let retVal:User[]=[];
    this.userService.getFriends().subscribe((res:User[])=>{
      res.forEach(obj=>{
        retVal.push(obj);
      })
    })

    return retVal;
  }

  sendRequests(){
    console.log(this.selected);

    var toSend = {'username':this.selected};
    this.userService.sendRequests(toSend).subscribe((res:any)=>{

        this.toastr.success('Friend request sent!','Success!');
      }
      , (err)=> {
        this.toastr.error(err.message,'Eroor!');
      }
    );

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

  getAllUsers():User[]{
    let retVal:User[]=[];
    this.userService.getAllUsers().subscribe((res:User[])=>{
      res.forEach(obj=>{
        retVal.push(obj);
      })
    })

    return retVal;
  }



  removeUser(user:User){
    this.userService.delete(user).subscribe((res:any)=>{
      this.sortedData=this.getFriends()
    })
  }

}
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
