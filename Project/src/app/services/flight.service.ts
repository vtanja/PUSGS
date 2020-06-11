import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FlightAdapter } from '../models/adapters/flight.adapter';
import { AddFlightComponent } from '../components/airlines/airline-administrator/airline-edit/admin-flights/add-flight/add-flight.component';
import { Observable, Subject } from 'rxjs';
import { Flight } from '../models/flight.model';
import { map } from 'rxjs/operators';
import { RoundFlightAdapter } from '../models/adapters/round-flight.adapter';

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  readonly baseUri = 'http://localhost:51474/api/';
  searchParamsSubject = new Subject<string>();
  filter=new Subject<{}>();
  
  constructor(private httpClient: HttpClient, private flightAdapter:FlightAdapter, private roundFlightAdapter:RoundFlightAdapter) { 

  }

  searchOneWayFlights(searchParams:{}){
    return this.httpClient.get(this.baseUri+'Flights/SearchOneWayFlights?'+ searchParams)
    .pipe(
      map((data:any)=>
      data.map(item=>this.flightAdapter.adapt(item)
      )
    )
    );
  }
  searchMultiFlights(searchParams:{}){
    return this.httpClient.get(this.baseUri+'Flights/searchMultiFlights?'+ searchParams)
    .pipe(
      map((data:any)=>
      data.map(item=>this.flightAdapter.adapt(item)
      )
    )
    );
  }
  searchRoundFlights(searchParams:{}){
    console.log('search round flight ', searchParams);
    return this.httpClient.get(this.baseUri+'Flights/searchRoundFlights?'+ searchParams)
    .pipe(
      map((data:any)=>
      data.map(item=>this.roundFlightAdapter.adapt(item)
      )
    )
    );
  }
  
  addFlight(flight:Flight){
    return this.httpClient.post(this.baseUri+'Flights',flight);
  }

  getFlight(id:number){
    return this.httpClient.get(this.baseUri+'Flights/'+id)
    .pipe(
      map(data=>this.flightAdapter.adapt(data))
  );
  }

  getFlights(){
    return this.httpClient.get(this.baseUri+'Flights')
    .pipe(
      map((data:any)=>
      data.map(item=>this.flightAdapter.adapt(item)
      )
    )
    );
  }

  getOccupiedSeats(id:number){
    return this.httpClient.get(this.baseUri+'Flights/'+id+'/OccupiedSeats');
  }
}
