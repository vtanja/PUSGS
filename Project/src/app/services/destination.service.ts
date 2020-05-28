import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DestinationService {

  readonly baseUri = 'http://localhost:51474/api/';
  constructor(private httpClient:HttpClient) { }


  addDestination(toAdd:{}){
    return this.httpClient.post(this.baseUri+'Destinations/',toAdd);
  }

  deleteDestination(id: number){
    return this.httpClient.delete(this.baseUri+'Destinations/'+id);
  }

}
