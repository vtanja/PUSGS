
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { User } from './models/user';

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

    }

    getUser(){
        return this.loggedUser;
    }

}