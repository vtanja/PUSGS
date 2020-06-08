import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Airline } from '../models/airline.model';
import { Destination } from '../models/destination.model';

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

  getDestinations(airline:Airline){
    console.log(airline.destinations);
    let keys = Object.keys(airline.destinations);
    let ret:Destination[] = [];
    keys.forEach(country=>{
      airline.destinations[country].forEach(dest => {
      ret.push(dest);
      });
    });
    return ret;
  }

}
