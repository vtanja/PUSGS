import { Injectable } from '@angular/core';
import { BonusPointDiscount } from '../bonus-point-discount.model';
import { Adapter } from './adapter';

@Injectable({
  providedIn:"root"
})
export class BonusPointsDiscountAdapter implements Adapter<BonusPointDiscount>{
  adapt(item:any):BonusPointDiscount{
    return new BonusPointDiscount(item.id,item.minPoints,item.maxPoints,item.discount);
  }
}
