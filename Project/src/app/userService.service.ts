
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class UserService{
    userLogged = new Subject<string>();
    isLogged = new Subject<boolean>();

}