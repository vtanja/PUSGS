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
import { AirlineEditComponent } from '../airlines/airline-administrator/airline-edit/airline-edit.component';
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

   hasAirline(){
    return this.httpClient.get(this.baseUri+'Airlines/HasUserAirline/'+this.userService.getUserId());
  }

  editCompanyData(id:number, airline:{}){
    console.log(id);
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
             console.log(address);
   }

   addAirline(airline:{}){
     console.log(airline);
      return this.httpClient.post(this.baseUri+'Airlines/',airline);
   }

  deleteDestination(country:string, city:string):boolean{
    // let user = this.userService.getLoggedUser();
    // let company = this.airlineService.getAirline(user.airlineCompany);
    // console.log(company.destinations);
    // console.log(country);
    // let index = company.destinations[country].indexOf(city);
    // company.destinations[country].splice(index,1);
    // if(company.destinations[country].length===0){
    //   delete company.destinations[country];
    // }
    return true;
  }

  addPlane(plane:Plane){
    // let airline = this.airlineService.getAirline(this.userService.getLoggedUser().airlineCompany);
    // if(airline!==undefined){
    //   if(airline.planes.find(p=>p.id===plane.id)===undefined  && airline.planes.find(p=>p.name===plane.name)===undefined){
    //     plane.id=airline.planes.length+1;
    //     airline.planes.push(plane);
    //     return true;
    //   }
    // }

    return false;
  }

  addSeats(planeId:number, segment:string, rows:number){
    // let airline = this.airlineService.getAirline(this.userService.getLoggedUser().airlineCompany);
    // let planeFound = airline.planes.find(p=>p.id===planeId);
    // if(planeFound!==undefined){
    //   let segmentFound = planeFound.segments.find(s=>s.name===segment);
    //   if(segmentFound!==undefined){
    //     segmentFound.value.rows+=rows;
    //     return true;
    //   }
    // }
      return false;
  }

  deletePlane(id:number):boolean{
    // let airline = this.airlineService.getAirline(this.userService.getLoggedUser().airlineCompany);
    // if(airline !== undefined){
    //   let plane=airline.planes.find(p=>p.id===id);
    //   if(plane!==undefined && plane.booked.length===0){
    //     let flights:Flight[]=this.airlineService.findFlights(airline.id, plane.name);
    //     if(flights.length===0){
    //       this.airlineService.deletePlane(airline.id, plane.id);
    //       return true;
    //     }
    //   }
    // }

    return false;
  }
}
