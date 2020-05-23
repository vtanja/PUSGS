
import { Subject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { UserAdapter } from '../models/adapters/user.adapter';
import { CarReservation } from '../models/car-reservation.model';
import { FlightReservation } from '../models/flight-reservation.model';
import { RentCarService } from './rent-a-car.service';
import { AirlineService } from './airline.service';
import { UsersRate } from '../models/users-rate.model';
import { LoggedUser } from '../models/logged-user.model';
import { Address } from '../models/address';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from '../models/user';
import { SignalRService } from './signal-r.service';
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

    isUserLogged():boolean{
      if(localStorage.getItem('loggedUser')!=undefined)
        return true;
      return false;

    //   if(localStorage.getItem('token')!=undefined)
    //   return true;
    // return false;
    }

    getUserFromName(name:string){
      return JSON.parse(localStorage.getItem('loggedUser')).name;
    }

    login(loginData:{}){
      return this.httpClient.post(this.baseUri + 'User/Login',loginData);
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
      console.log(username);
       return this.httpClient.get(this.baseUri+'User/'+username)
       .pipe(
        map((data:any)=>
             this.userAdapter.adapt(data)
        )
      );
    }

    getFlightReservations(){
      let username = JSON.parse(localStorage.getItem('loggedUser')).username;
      return this.users.find(u=>u.username===username).flightReservations.slice();
    }

    getCarReservations(){
      let username = JSON.parse(localStorage.getItem('loggedUser')).username;
      return this.users.find(u=>u.username===username).carReservations.slice();
    }

    addCarRate(reservationId:number,rate:number){

      let username = JSON.parse(localStorage.getItem('loggedUser')).username;

      var reservation = this.users.find(u=>u.username===username).carReservations.find(r=>r.id===reservationId);
      this.users.find(u=>u.username===username).carReservations.find(r=>r.id===reservationId).carRate=rate;

      var carRate = new UsersRate(rate,username,reservationId);
      this.rentCarService.addCarRate(reservation.companyId,reservation.carId,carRate);

    }

    addCarCompanyRate(reservationId:number,rate:number){

      let username = JSON.parse(localStorage.getItem('loggedUser')).username;

      let reservation = this.users.find(u=>u.username===username).carReservations.find(r=>r.id===reservationId);
      this.users.find(u=>u.username===username).carReservations.find(r=>r.id===reservationId).companyRate=rate;

      let companyRate = new UsersRate(rate,username,reservationId);
      this.rentCarService.addCompanyRate(reservation.companyId,companyRate);

    }

    addFlightRate(reservationId:number,rate:number){

      let username = JSON.parse(localStorage.getItem('loggedUser')).username;

      let reservation = this.users.find(u=>u.username===username).flightReservations.find(r=>r.flightID===reservationId);
      this.users.find(u=>u.username===username).flightReservations.find(r=>r.flightID===reservationId).flightRate=rate;

      let flightRate = new UsersRate(rate,username,reservationId);
      this.airlineService.addFlightRate(reservation.companyID,reservation.flightID,flightRate);

    }

    addAirlineRate(reservationId:number,rate:number){

      let username = JSON.parse(localStorage.getItem('loggedUser')).username;

      let reservation = this.users.find(u=>u.username===username).flightReservations.find(r=>r.flightID===reservationId);
      this.users.find(u=>u.username===username).flightReservations.find(r=>r.flightID===reservationId).airlineRate=rate;

      let companyRate = new UsersRate(rate,username,reservationId);
      this.airlineService.addCompanyRate(reservation.companyID,companyRate);

    }

    makeCarReservation(reservation:CarReservation):boolean{

      let username = JSON.parse(localStorage.getItem('loggedUser')).username;
      reservation.username=username;
      this.users.find(u=>u.username===username).carReservations.push(reservation);

      return true;

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

    updateProfile(userData:{}){
      return this.httpClient.put(this.baseUri+'User/', userData['userName'] ,userData)
    }

    getUserProfile(){
      return this.httpClient.get(this.baseUri + 'User/Profile');
    }

    getUserRole(){
      let payload = jwt_decode(localStorage.getItem('token'));
      return payload.role;
    }

    getUserName(){
      let payload = jwt_decode(localStorage.getItem('token'));
      return payload.UserName;
    }

    isUserLoggedIn(){
         if(localStorage.getItem('token')!=undefined)
      return true;
    return false;
    }

    googleLogin(formData){
      return this.httpClient.post(this.baseUri + 'User/GoogleLogin',formData);
    }

    facebookLogin(formData){
      return this.httpClient.post(this.baseUri + 'User/FacebookLogin',formData);
    }

}
