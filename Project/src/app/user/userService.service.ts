
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { CarReservation } from '../models/carReservation.model';
import { FlightReservation } from '../models/flightReservation.model';

interface Passenger {
    seat: number;
    passenger: {firstname:string, lastname:string, passportNo:string};
  }

@Injectable()
export class UserService{
    userLogged = new Subject<string>();
    isLogged = new Subject<boolean>();
    loggedUser:User;

    constructor(){
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

    getFlightReservations(){
        return this.loggedUser.flightReservations.slice();
    }

    getCarReservations(){
        return this.loggedUser.carReservations.slice();
    }

    getUser(){
        return this.loggedUser;
    }

}