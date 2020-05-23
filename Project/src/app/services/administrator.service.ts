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
    let users:User[]=[];
     this.usersService.getAllUsers().subscribe((res:User[])=>{
       res.forEach(item=>users.push(item))
     });
     return users;
  }
}
