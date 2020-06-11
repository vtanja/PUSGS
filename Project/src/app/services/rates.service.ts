import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class RatesService{
  readonly baseUri = 'http://localhost:51474/api/';

  constructor(private httpClient: HttpClient) {}

  addCarRate(data){
    return this.httpClient.post(this.baseUri+'CarRates',data);
  }

  addCarCompanyRate(data){
    return this.httpClient.post(this.baseUri+'CompanyRates',data);
  }

  addFlightRate(data){
    return this.httpClient.post(this.baseUri+'FlightRates',data);
  }

  addAirlineRate(data){
    return this.httpClient.post(this.baseUri+'AirlineRates',data);
  }
}
