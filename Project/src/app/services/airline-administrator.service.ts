import { Injectable } from '@angular/core';
import { UserService } from './user-service.service';
import { AirlineService } from './airline.service';
import { Airline } from '../models/airline.model';
import { Address } from '../models/address';
import { Plane } from '../models/plane';
import { IgxExcelStylePinningTemplateDirective } from 'igniteui-angular/lib/grids/filtering/excel-style/grid.excel-style-filtering.component';
import { Subject, Observable } from 'rxjs';
import { Flight } from '../models/flight.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AirlineAdapter } from '../models/adapters/airline.adapter';
import { AirlineEditComponent } from '../components/airlines/airline-administrator/airline-edit/airline-edit.component';
import { AirlineProfileAdapter } from '../models/adapters/airline-profile.adapter';

@Injectable({
  providedIn: 'root'
})
export class AirlineAdministratorService {
  plane:Subject<Plane>;
  readonly baseUri = 'http://localhost:51474/api/';
  constructor(private userService:UserService, private airlineService:AirlineService, private httpClient:HttpClient, private airlineAdapter:AirlineAdapter, private airlineProfileAdapter:AirlineProfileAdapter) {
   }

   getAirline():Observable<Airline>{
     return this.httpClient.get(this.baseUri + 'Airlines/GetAirlineByUser/'+this.userService.getUserName())
      .pipe(
        map(data=>this.airlineProfileAdapter.adapt(data))
      )
   }

  editCompanyData(id:number, airline:{}){
    return this.httpClient.put(this.baseUri+'Airlines/'+id, airline);
  }

  async reverseGeocode(address:Address) {
    let city = address.city.replace(' ','+');
    let street = address.street.replace(' ','+');
    let country = address.country.replace(' ','+');
    const data = await fetch('https://nominatim.openstreetmap.org/search?q=' + address.num + '+'+street+',+'+city + ',+' + country+'&format=json',{
       headers:{
         'Accept-Language' : 'en-US'
       }
     });
             const res = await data.json();
             address.longitude = +res[0].lon;
             address.latitude=+res[0].lat;
   }

   addAirline(airline:{}){
      return this.httpClient.post(this.baseUri+'Airlines/',airline);
   }

  
}
