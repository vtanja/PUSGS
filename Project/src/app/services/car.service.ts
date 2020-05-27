import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { CarAdapter } from '../models/adapters/car.adapter';

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

  changeCarPrice(carId: number, newPrice: number) {
    let data = {
      op: 'replace',
      path: '/price',
      value: newPrice,
    };

    return this.httpClient.patch(this.baseUri + 'Cars/' + carId,newPrice);
  }
}
