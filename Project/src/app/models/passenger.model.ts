import { Seat } from './seat.model';

export class Passenger {
    firstName :string;
    lastName:string;
    acceptedInvitation:boolean;
    seats:Seat[];
    passport :string;
    sendInvitation:boolean;

    constructor(firstName :string, lastName:string, seats:Seat[], passport :string){
        this.firstName=firstName;
        this.lastName=lastName;
        this.seats = seats;
        this.passport = passport;
        this.acceptedInvitation=true;
        this.sendInvitation = false;
    }
}