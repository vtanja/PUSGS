import { Adapter } from './adapter';
import { Office } from '../office';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn:"root"
})
export class OfficeAdapter implements Adapter<Office>{
  adapt(item: any) {
    return new Office(item.officeId,item.number,item.street,item.city,item.country,item.longitude,item.latitude);
  }

}
