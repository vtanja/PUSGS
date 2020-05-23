import { Injectable } from '@angular/core';
import { Adapter } from '../adapter';
import { User } from '../user';

@Injectable({
    providedIn: "root"
  })
  export class UserAdapter implements Adapter<User>{
    adapt(item: any): User {
      return new User(item.firstName, item.lastName, item.email, "", item.username, "", item.phoneNumber, item.address, []);
    }
  }