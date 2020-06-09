import { Injectable } from '@angular/core';
import { Airline } from '../models/airline.model';
import { Flight } from '../models/flight.model';
import { Subject, Observable, of } from 'rxjs';
import { Address } from '../models/address';
import { UsersRate } from '../models/users-rate.model';
import { Airport } from '../models/airport';
import { Plane } from '../models/plane';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { AirlineAdapter } from '../models/adapters/airline.adapter';
import { AirlineProfileAdapter } from '../models/adapters/airline-profile.adapter';

@Injectable()
export class AirlineService{
    private airlines:Airline[];

    rateModalClose = new Subject();
    
    readonly baseUri = 'http://localhost:51474/api/';

    constructor(private httpClient:HttpClient, private airlineAdapter:AirlineAdapter, private airlineprofileAdapter:AirlineProfileAdapter){
        
    }

    getAirlineId(id:string){
        return this.httpClient.get(this.baseUri+'Airlines/GetId'+id);
    }

    getAirlines():Observable<Airline[]>{
        return this.httpClient.get(this.baseUri+'Airlines')
        .pipe(
            map((data:any)=>
            data.map(item=>this.airlineAdapter.adapt(item)
            )
          )
        )
    }

    getAirline(id:number){
        console.log('get airline: ' ,id);
        return this.httpClient.get(this.baseUri + 'Airlines/GetAirlineById/'+id)
        .pipe(
            map(data=>this.airlineprofileAdapter.adapt(data))
        );
    }
    

    addFlightRate(companyID:number,flightID:number,flightRate:UsersRate){
      this.airlines.find(r=>r.id===companyID).flights.find(f=>f.id===flightID).addRate(flightRate);
    }

    addCompanyRate(companyID:number,rate:UsersRate){
      this.airlines.find(r=>r.id===companyID).addRate(rate);
    }
}
