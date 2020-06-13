import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable()
export class AppDataService {

  readonly baseUri = 'http://localhost:51474/api/';
    private locations: string[] = null;
    addressesSubject:Subject<string[]> = new Subject<string[]>();

    constructor(private httpClient:HttpClient){}
    get Locations() {
        return this.locations;
    }

    addLocation(data:string){
      this.locations.push(data);
    }

    public load() {
         this.httpClient.get(this.baseUri+"Addresses").subscribe(
           (res:any)=>{
              this.locations = res;
              this.addressesSubject.next(this.locations);
           },(err)=>{

           }
         );
    }
}
