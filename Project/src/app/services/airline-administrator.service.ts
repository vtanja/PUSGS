import { Injectable } from '@angular/core';
import { UserService } from './user-service.service';
import { AirlineService } from './airline.service';
import { Airline } from '../models/airline.model';
import { Address } from '../models/address';

@Injectable({
  providedIn: 'root'
})
export class AirlineAdministratorService {

  constructor(private userService:UserService, private airlineService:AirlineService) { }

  getAirline():Airline {
    let loggedUser = this.userService.getLoggedUser();
    return this.airlineService.getAirline(loggedUser.airlineCompany);
  }

  editCompanyData(companyID:number,name:string,description:string,address:Address,logo:string){

    let company = this.airlineService.getAirline(companyID);
    company.name=name;
    company.description=description;
    company.address = address;
    this.reverseGeocode(address).then(()=>{
      console.log("reerse geocode true");
    },()=>{
      console.log("reerse geocode false");
    });

    return true;
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

   addDestination(country:string, city:string):boolean{
    let user = this.userService.getLoggedUser();
    let company = this.airlineService.getAirline(user.airlineCompany);

    if(company.destinations[country]!=undefined){
      company.destinations[country].push(city);
    }else{
      let destinations = [];
      destinations.push(city);
      company.destinations[country] = destinations;
    }
    return(true);
  }

  deleteDestination(country:string, city:string):boolean{
    let user = this.userService.getLoggedUser();
    let company = this.airlineService.getAirline(user.airlineCompany);
    console.log(company.destinations);
    console.log(country);
    let index = company.destinations[country].indexOf(city);
    company.destinations[country].splice(index,1);
    if(company.destinations[country].length===0){
      delete company.destinations[country];
    }
    return true;
  }

}
