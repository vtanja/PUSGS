
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { CarReservation } from '../models/carReservation.model';
import { FlightReservation } from '../models/flightReservation.model';
import { RentCarService } from './rent-a-car.service';
import { AirlineService } from './airline.service';
import { UsersRate } from '../models/users-rate.model';

interface Passenger {
    seat: number;
    passenger: {firstname:string, lastname:string, passportNo:string};
  }

@Injectable()
export class UserService{
    userLogged = new Subject<string>();
    isLogged = new Subject<boolean>();
    loggedUser:User;

    constructor(private rentCarService:RentCarService,private airlineService:AirlineService){
        this.loggedUser=new User('Tanja', 'Vukmirovic', 'tanja.vukmirovic8@gmail.com',
            'tanja123', 'tanja1sifra', '+38165432156', 'Zdravka Celara 185, Futog',
            [new User('Andjela', 'Cickovic', 'andjela.ljuban@gmail.com', 'andjela123',
            'andjela1sifra', '+38165432123', 'Trebinje', []),
            new User('Pera', 'Peric', 'pera@pera.com', 'pera123', 'pera1sifra', '+381987654321', 'Perina ulica 1, Novi Sad', [])] );

        this.loggedUser.friendRequests.push(new User("Natasa", "Lukic", "natasa.naca.lukic@gmail.com", "naca", "nata1sifra", "0657654355", "Adresa 1", []));
        this.loggedUser.carReservations.push(new CarReservation("3-5-2020","10:00","4-5-2020","10:00", 2, 90, 1, "Firefly", 1, "Audi"));

        let passenger1: Passenger = {seat: 101, passenger:{firstname:"Tanja", lastname:"Vukmirovic", passportNo:"123456785"}};
        let passenger2: Passenger = {seat: 102, passenger:{firstname:"Andjela", lastname:"Cickovic", passportNo:"123456775"}};
        this.loggedUser.flightReservations.push(new FlightReservation("rez1", 1, 0, 150, [passenger1, passenger2]));
        // this.loggedUser.flightReservations[0].carReservation.push(new CarReservation("3-5-2020","10:00","4-5-2020","10:00", 2, 90, 1, "Firefly", 1, "Audi"));
    }

    getUserFromName(name:string){
      return this.loggedUser.friends.find(x=>x.name===name);
    }

    getFlightReservations(){
        return this.loggedUser.flightReservations.slice();
    }

    getCarReservations(){
        return this.loggedUser.carReservations.slice();
    }

    getUser(){
        return this.loggedUser;
    }

    addCarRate(reservationId:number,rate:number){

      var reservation = this.loggedUser.carReservations.find(r=>r.id===reservationId);
      this.loggedUser.carReservations.find(r=>r.id===reservationId).carRate=rate;

      var carRate = new UsersRate(rate,this.loggedUser.username,reservationId);
      this.rentCarService.addCarRate(reservation.companyId,reservation.carId,carRate);

    }

    addCarCompanyRate(reservationId:number,rate:number){

      var reservation = this.loggedUser.carReservations.find(r=>r.id===reservationId);
      this.loggedUser.carReservations.find(r=>r.id===reservationId).companyRate=rate;

      var companyRate = new UsersRate(rate,this.loggedUser.username,reservationId);
      this.rentCarService.addCompanyRate(reservation.companyId,companyRate);

    }

    addFlightRate(reservationId:number,rate:number){

      var reservation = this.loggedUser.flightReservations.find(r=>r.flightID===reservationId);
      this.loggedUser.flightReservations.find(r=>r.flightID===reservationId).flightRate=rate;

      var flightRate = new UsersRate(rate,this.loggedUser.username,reservationId);
      this.airlineService.addFlightRate(reservation.companyID,reservation.flightID,flightRate);

    }

    addAirlineRate(reservationId:number,rate:number){

      var reservation = this.loggedUser.flightReservations.find(r=>r.flightID===reservationId);
      this.loggedUser.flightReservations.find(r=>r.flightID===reservationId).airlineRate=rate;

      var companyRate = new UsersRate(rate,this.loggedUser.username,reservationId);
      this.airlineService.addCompanyRate(reservation.companyID,companyRate);

    }


}
