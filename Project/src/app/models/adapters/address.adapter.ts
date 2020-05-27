import { Address } from '../address';
import { Adapter } from './adapter';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn:"root"
})
export class AddressAdapter implements Adapter<Address>{
  adapt(item:any):Address{
    return new Address(item.addressId,item.number,item.street,item.city,item.country,item.longitude,item.latitude);
  }
}
