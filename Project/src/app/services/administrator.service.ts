import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { UserService } from './user-service.service';

@Injectable()
export class AdministratorService{

  constructor(private usersService:UserService){}

  addAdministrator(user:User):boolean{
    this.getAllUsers().push(user);
    return true;
  }

  getAllUsers():User[]{
    return this.usersService.getAllUsers();
  }
}
