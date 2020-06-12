import { Subject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { UserAdapter } from '../models/adapters/user.adapter';
import { RentCarService } from './rent-a-car.service';
import { AirlineService } from './airline.service';
import { UsersRate } from '../models/users-rate.model';
import { Address } from '../models/address';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from '../models/user';
import * as jwt_decode from "jwt-decode";

interface Passenger {
    seat: number;
    passenger: {firstname:string, lastname:string, passportNo:string};
  }

@Injectable()
export class UserService{
    userLogged = new Subject<boolean>();
    users:User[];
    newRequest:Subject<boolean> = new Subject<boolean>();

    changeMap:Subject<Address>;
    readonly baseUri = 'http://localhost:51474/api/';

    constructor(private rentCarService:RentCarService,private airlineService:AirlineService,private httpClient:HttpClient, private userAdapter:UserAdapter){
      this.changeMap = new Subject<Address>();

    }

    login(loginData:{}){
      return this.httpClient.post(this.baseUri + 'User/Login',loginData);
    }

    googleLogin(formData){
      return this.httpClient.post(this.baseUri + 'User/GoogleLogin',formData);
    }

    facebookLogin(formData){
      return this.httpClient.post(this.baseUri + 'User/FacebookLogin',formData);
    }

    changePassword(data){
      return this.httpClient.post(this.baseUri+'User/ChangePassword',data);
    }

    sendRequests(selectedUser:{}){
        return this.httpClient.post(this.baseUri + 'Friendship/SendRequest', selectedUser);
    }

    logout():boolean{
      localStorage.removeItem('token');
      this.userLogged.next(false);
      return true;
    }

    accept(user:User){
      return this.httpClient.put(this.baseUri+'Friendship/'+user.username,undefined);
    }

    delete(user:User){
      return this.httpClient.delete(this.baseUri+'Friendship/'+user.username);
    }

    getLoggedUser():User{
      let username = this.getUserName();
      return this.users.find(u=>u.username===username);
    }

    getUser():Observable<Object>{
      let username = this.getUserName();
       return this.httpClient.get(this.baseUri+'User/'+username)
       .pipe(
        map((data:any)=>
             this.userAdapter.adapt(data)
        )
      );
    }


    getAllUsers():Observable<User[]>{
      return this.httpClient.get(this.baseUri+'User/AllUsers')
        .pipe(
          map((data:any)=>
            data.map(item=>this.userAdapter.adapt(item)
            )
          )
        );

    }

    getFriends():Observable<User[]>{
      return this.httpClient.get(this.baseUri + 'Friendship/Friends')
      .pipe(
        map((data:any)=>
        data.map(item=>this.userAdapter.adapt(item)))
      );
    }

    getFriendRequests():Observable<User[]>{
      return this.httpClient.get(this.baseUri + 'Friendship/Requests')
      .pipe(
        map((data:any)=>
        data.map(item=>this.userAdapter.adapt(item)))
      );
    }

    register(userData:{}){
     return this.httpClient.post(this.baseUri + 'User/Register',userData);
    }

    addAdmin(userData:{}){
      return this.httpClient.post(this.baseUri + 'User/AddAdmin',userData);
     }

    updateProfile(userData:{}){
      console.log(userData);
      return this.httpClient.put(this.baseUri+'User/'+ this.getUserName() ,userData);
    }

    getUserProfile(){
      return this.httpClient.get(this.baseUri + 'User/Profile');
    }

    getUserRole(){
      let payload = jwt_decode(localStorage.getItem('token'));
      return payload.role;
    }

    getUserId(){
      let payload = jwt_decode(localStorage.getItem('token'));
      return payload.UserID;
    }
    getUserName(){
      let payload = jwt_decode(localStorage.getItem('token'));
      return payload.UserName;
    }

    hasAirline(){
      return this.httpClient.get(this.baseUri+'Airlines/HasUserAirline/'+this.getUserId());
    }

    userHasCompany(){
      return this.httpClient.get(this.baseUri + "RentCarAdmins/UserHasCompany");
    }

    isUserLoggedIn(){
        if(localStorage.getItem('token')!=undefined)
          return true;
        return false;
    }

    roleMatch(allowedRoles):boolean{
      var isMatch = false;
      var userRole = this.getUserRole();
      allowedRoles.forEach(element => {
        if(userRole===element){
          isMatch=true;
          return false;
        }
      });
      return isMatch;
    }
}
