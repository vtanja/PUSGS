import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class RentCarOfficesService{
  readonly baseUri = 'http://localhost:51474/api/';
  constructor(private httpClient:HttpClient){}

  getOffices(){
      return this.httpClient.get(this.baseUri+"Offices");
  }

  deleteOffice(id:number){
    return this.httpClient.delete(this.baseUri+"Offices/" +id);
  }

  addOffice(data:{}){
    return this.httpClient.post(this.baseUri+"Offices",data);
  }
}
