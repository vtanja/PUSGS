import { RentCar } from '../models/rent-a-car.model';
import { Injectable } from '@angular/core';
import { Car } from '../models/Car.model';
import { Subject } from 'rxjs';
import { Address } from '../models/address';
import { RateDialogComponent } from '../components/user/reservations/rate-dialog/rate-dialog.component';
import { UsersRate } from '../models/users-rate.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { RentCarAdapter } from '../models/adapters/rent-a-car.adapter';
import { RentCarProfileAdapter } from '../models/adapters/rent-a-car-profile.adapter';

@Injectable()
export class RentCarService {
  rentCars: Array<RentCar> = new Array<RentCar>();
  searchParamsSubject = new Subject<string>();
  searchCarsParamsSubject = new Subject<{}>();
  sortChange = new Subject<string>();
  rentCarChangeSubject = new Subject<number>();
  firstCompanyAdded = new Subject<boolean>();

  readonly baseUri = 'http://localhost:51474/api/';

  constructor(private httpClient:HttpClient,private rentCarAdapter:RentCarAdapter,private rentCarProfileAdapter: RentCarProfileAdapter) {
  }

  getRentCars() {
    return this.httpClient.get(this.baseUri + 'RentCars').pipe(
      map((data: any[]) => data.map(item => this.rentCarAdapter.adapt(item))),
    );
  }

  getRentCarMainData(){
    return this.httpClient.get(this.baseUri+"RentCars/CompanyMainData");
  }

  getRentCarCompany(id:number) {
   return this.httpClient.get(this.baseUri + 'RentCars/'+id).pipe(
     map((data:any) => {
     return this.rentCarProfileAdapter.adapt(data)}),
    );
  }

  addCompany(companyData:{}){
    return this.httpClient.post(this.baseUri+"RentCars" , companyData);
  }

  editCompanyMainData(companyID:number,data:{}){
    return this.httpClient.put(this.baseUri+"RentCars/" + companyID,data);
  }

  search(params: any) {
    return this.httpClient.get(this.baseUri+"RentCars/search?"+params).pipe(
      map((data: any[]) => data.map(item => this.rentCarAdapter.adapt(item))),
    );
  }


  getCarFromId(id: number) {
    for (let company of this.rentCars) {
      let car = company.cars.find((c) => c.id === id);
      if (car !== undefined) {
        return company.cars.find((c) => c.id === id);
      }
    }
  }

  addCarRate(companyID: number, carID: number, carRate: UsersRate) {
    // this.rentCars
    //   .find((r) => r.id === companyID)
    //   .cars.find((c) => c.id === carID)
    //   .addRate(carRate);
  }

  addCompanyRate(companyID: number, rate: UsersRate) {
    //this.rentCars.find((r) => r.id === companyID).addRate(rate);
  }

  getCarsAtLocation(location: string): Car[] {
    let result: Car[] = [];
    let places: any[] = location.split(',');
    for (let rentCar of this.rentCars) {
      {
        let cars = rentCar.cars;
        if (rentCar.offices[places[1].trim()] !== undefined) {
          let offices: string[] = rentCar.offices[places[1].trim()];
          if (offices !== undefined) {
            if (offices.indexOf(places[0].trim()) !== -1) {
              result.push(...cars);
            }
          }
        }
      }
    }
    return result;
  }


}
