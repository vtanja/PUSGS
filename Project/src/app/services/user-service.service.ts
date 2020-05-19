
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { CarReservation } from '../models/car-reservation.model';
import { FlightReservation } from '../models/flight-reservation.model';
import { RentCarService } from './rent-a-car.service';
import { AirlineService } from './airline.service';
import { UsersRate } from '../models/users-rate.model';
import { LoggedUser } from '../models/logged-user.model';
import { Address } from '../models/address';
import { HttpClient, HttpHeaders } from '@angular/common/http';

interface Passenger {
    seat: number;
    passenger: {firstname:string, lastname:string, passportNo:string};
  }

@Injectable()
export class UserService{
    userLogged = new Subject<boolean>();
    users:User[];
    changeMap:Subject<Address>;
    readonly baseUri = 'http://localhost:51474/api/';

    constructor(private rentCarService:RentCarService,private airlineService:AirlineService,private httpClient:HttpClient){



      this.users = [];
      this.changeMap = new Subject<Address>();

      this.users.push(new User('Tanja', 'Vukmirovic', 'tanja.vukmirovic8@gmail.com','USER',
            'tanja123', 'tanja1sifra', '+38165432156', 'Zdravka Celara 185, Futog',
            [new User('Andjela', 'Cickovic', 'andjela.ljuban@gmail.com',"USER", 'andjela123',
            'andjela1sifra', '+38165432123', 'Trebinje', []),
            new User('Pera', 'Peric', 'pera@pera.com','USER', 'pera123', 'pera1sifra', '+381987654321', 'Perina ulica 1, Novi Sad', [])] ));

        this.users[0].friendRequests.push(new User("Natasa", "Lukic", "natasa.naca.lukic@gmail.com",'USER', "naca", "nata1sifra", "0657654355", "Adresa 1", []));
        this.users[0].carReservations.push(new CarReservation("3-5-2020","10:00","4-5-2020","10:00", 2, 90, 1, "Firefly", 1, "Audi","Q3"));

        let passenger1: Passenger = {seat: 101, passenger:{firstname:"Tanja", lastname:"Vukmirovic", passportNo:"123456785"}};
        let passenger2: Passenger = {seat: 102, passenger:{firstname:"Andjela", lastname:"Cickovic", passportNo:"123456775"}};
        this.users[0].flightReservations.push(new FlightReservation("rez1", 1, 0, 150, [passenger1, passenger2]));
        // this.loggedUser.flightReservations[0].carReservation.push(new CarReservation("3-5-2020","10:00","4-5-2020","10:00", 2, 90, 1, "Firefly", 1, "Audi"));

        let rentCarAdmin = new User('caradmin','caradmin','email@gmail.com','CARADMIN','c','c','123456789','My address',[]);
        rentCarAdmin.carCompany = 1;

        let airlineAdmin = new User('airlineadmin','airlineadmin','email@gmail.com',"AIRLINEADMIN",'a','a','123456789','My address',[]);
        airlineAdmin.airlineCompany = 1;

        let admin = new User('admin','admin','email@gmail.com','ADMINISTRATOR','admin','admin','123456789','My address',[]);

        this.users.push(rentCarAdmin);
        this.users.push(airlineAdmin);
        this.users.push(admin);
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

    logout():boolean{
      localStorage.removeItem('token');
      this.userLogged.next(false);
      return true;
    }

    getLoggedUser():User{
      let username = JSON.parse(localStorage.getItem('loggedUser')).username;
      return this.users.find(u=>u.username===username);
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

    getAllUsers():User[]{
      return this.users;
    }

    register(userData:{}){
     return this.httpClient.post(this.baseUri + 'User/Register',userData);
    }

    getUserProfile(){
      return this.httpClient.get(this.baseUri + 'User/Profile');
    }

    getUserRole(){
      let payload = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
      let role = payload.role;
      return role;
    }

    getUserName(){
      let payload = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
      let role = payload.UserName;
      return role;
    }

    isUserLoggedIn(){
         if(localStorage.getItem('token')!=undefined)
      return true;
    return false;
    }


}
