import { CarReservation } from './carReservation.model';
import { FlightReservation } from './flightReservation.model';

export class User {
     firstName:string;
     lastName:string;
     email:string;
     username:string;
     password:string;
     phoneNumber:string;
     address:string;
     friends:User[];
     friendRequests:User[];
     profileImage:string;
     carReservations:CarReservation[];
     flightReservations:FlightReservation[];
     name:string;

    constructor(firstName:string, lastName:string,
          email:string, username:string, password:string, phone:string, address:string, friends:User[] ){
            this.firstName=firstName;
            this.lastName=lastName;
            this.email=email;
            this.username=username;
            this.password=password;
            this.phoneNumber=phone;
            this.address=address;
            this.friends=friends;
            this.friendRequests=[];
            this.profileImage="../../assets/images/profilna.png";
            this.carReservations = [];
            this.flightReservations=[];
            this.name=this.firstName+' '+this.lastName;
         }
}
