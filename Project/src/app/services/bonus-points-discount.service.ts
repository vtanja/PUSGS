import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BonusPointsDiscountAdapter } from '../models/adapters/bonus-points-discount.adapter';
import { map } from 'rxjs/operators';

@Injectable()
export class BonusPointsDiscountService {
  readonly baseUri = 'http://localhost:51474/api/';

  constructor(private httpClient: HttpClient,private bpDiscountAdapter:BonusPointsDiscountAdapter) {}

  getAllBonusPointsDiscounts(){
    return this.httpClient.get(this.baseUri+"BonusPointsDiscounts").pipe(
      map((data: any[]) => data.map(item => this.bpDiscountAdapter.adapt(item))),
    );
  }

  updateBonusPointsDiscounts(data:any){
    return this.httpClient.put(this.baseUri+"BonusPointsDiscounts",data);
  }

}
