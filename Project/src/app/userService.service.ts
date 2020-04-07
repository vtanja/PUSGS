
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class UserService{
    userLogged = new Subject<string>();
    observers = [];

    getObservers(){
        return this.userLogged.observers.slice();
    }
}