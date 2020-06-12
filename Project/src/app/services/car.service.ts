import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { CarAdapter } from '../models/adapters/car.adapter';
import { Car } from '../models/Car.model';

@Injectable()
export class CarService {
  readonly baseUri = 'http://localhost:51474/api/';

  constructor(private httpClient: HttpClient,private carAdapter:CarAdapter) {}

  getCompanyCars() {
    return this.httpClient.get(this.baseUri + 'Cars/CompanyCars').pipe(
      map((data: any[]) => data.map(item => this.carAdapter.adapt(item))),
    );
  }

  addCar(newCar:{}) {
    return this.httpClient.post(this.baseUri + 'Cars',newCar);
  }

  deleteCar(carId: number) {
    return this.httpClient.delete(this.baseUri + 'Cars/' + carId);
  }

  changeCarPrice(carId: number, car: Car) {

    let data = JSON.stringify(car);
    return this.httpClient.put(this.baseUri + 'Cars/' + carId,car);
  }

  searchCars(params:string){
    return this.httpClient.get(this.baseUri+"Cars/Search?"+params).pipe(
      map((data: any[]) => data.map(item => this.carAdapter.adapt(item))),
    );
  }

  searchCompanyCars(params:string){
    console.log(params);
    return this.httpClient.get(this.baseUri+"Cars/CompanyCarsSearch?"+params).pipe(
      map((data:any[]) => data.map(item => this.carAdapter.adapt(item))),
    )
  }

  searchDiscountCars(params:string){
    console.log(params);
    return this.httpClient.get(this.baseUri+"Cars/DiscountCarsSearch?"+params).pipe(
      map((data:any[]) => data.map(item => this.carAdapter.adapt(item))),
    )
  }

}
