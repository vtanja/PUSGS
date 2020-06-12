import { CarReservation } from './car-reservation.model';
import { FlightReservation } from './flight-reservation.model';
import { Injectable } from '@angular/core';
import { Adapter } from './adapter';
import { isRegExp } from 'util';

export class User {
    userID:string;
     firstName:string;
     lastName:string;
     email:string;
     role:string;
     username:string;
     password:string;
     phoneNumber:string;
     address:string;
     profileImage:string;

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
            this.profileImage='profilna.png'
         }
        

        getName():string{
          return this.firstName+' '+this.lastName;
        }
      }