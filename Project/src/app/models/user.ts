import { CarReservation } from './car-reservation.model';
import { FlightReservation } from './flight-reservation.model';
import { Injectable } from '@angular/core';
import { Adapter } from './adapter';
import { isRegExp } from 'util';

export class User {
     firstName:string;
     lastName:string;
     email:string;
     role:string;
     username:string;
     password:string;
     phoneNumber:string;
     address:string;
     friends:User[];
     friendRequests:User[];
     profileImage:string;
     carReservations:CarReservation[];
     flightReservations:FlightReservation[];
     carCompany:number;
     airlineCompany:number;

    constructor(firstName:string, lastName:string,
          email:string,role:string, userName:string, password:string, phone:string, address:string, friends:User[] ){
            this.firstName=firstName;
            this.lastName=lastName;
            this.email=email;
            this.username=userName;
            this.password=password;
            this.role=role;
            this.phoneNumber=phone;
            this.address=address;
            this.friends=friends;
            this.friendRequests=[];
            this.profileImage="../../assets/images/profilna.png";
            this.carReservations = [];
            this.flightReservations=[];

         }
        

        getName():string{
          return this.firstName+' '+this.lastName;
        }
      }