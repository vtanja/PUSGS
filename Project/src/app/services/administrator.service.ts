import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UserAdapter } from '../models/adapters/user.adapter';

@Injectable()
export class AdministratorService{

  readonly baseUri = 'http://localhost:51474/api/';
  constructor(private userAdapter:UserAdapter,private httpClient:HttpClient){}



  addRentCarAdmin(data:{}){
    return this.httpClient.post(this.baseUri+'RentCarAdmins/AddAdmin',data);
  }

  addAirlineAdmin(data:{}){
    return this.httpClient.post(this.baseUri+'AirlineAdmins/AddAdmin',data);
  }

  getAllRentCarAdmins(){
    console.log('get');
    return this.httpClient.get(this.baseUri+'RentCarAdmins').pipe(
      map((data: any[]) => data.map(item => this.userAdapter.adapt(item))));
  }

  getAllAirlineAdmins(){
    return this.httpClient.get(this.baseUri+'AirlineAdmins').pipe(
      map((data: any[]) => data.map(item => this.userAdapter.adapt(item))));
  }
}
