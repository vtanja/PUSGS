import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DiscountDateService{

  readonly baseUri = 'http://localhost:51474/api/';

  constructor(private httpClient:HttpClient){}

  addDiscountDates(data:{}){
    return this.httpClient.post(this.baseUri+'DiscountDates',data);
  }

  overrideDiscount(data:{}){
    return this.httpClient.put(this.baseUri+'DiscountDates/Override',data);
  }

  getCarDiscountDates(id:number){
    return this.httpClient.get(this.baseUri+'DiscountDates/'+ id);
  }

  removeDiscountDates(data:any){
    return this.httpClient.delete(this.baseUri+'DiscountDates/'+ data);
  }
}
