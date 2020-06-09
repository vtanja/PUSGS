import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { PlaneAdapter } from '../models/adapters/plane.adapter';
import { Plane } from '../models/plane';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlaneService {

  readonly baseUri = 'http://localhost:51474/api/';

  constructor(private httpClient:HttpClient, private planeAdapter:PlaneAdapter) { }

  addPlane(plane: {}) {
    return this.httpClient.post(this.baseUri+'Planes/', plane);
  }

  getPlanes():Observable<Plane[]>{
    return this.httpClient.get(this.baseUri+"Planes")
    .pipe(
      map((data:any)=>
        data.map(item=>this.planeAdapter.adapt(item)
        )
      )
    );
  }

  getPlane(id:string):Observable<Plane>{
    console.log('get plane ', id);
    return this.httpClient.get(this.baseUri+'Planes/'+id)
    .pipe(
      map((data:any)=>
        this.planeAdapter.adapt(data)
        
      )
    );
  }

  deletePlane(id:string){
    return this.httpClient.delete(this.baseUri+'Planes/'+id);
  }

  updatePlaneConfig(id:string, plane:Plane ){
    console.log(plane);
    return this.httpClient.put(this.baseUri+'Planes/'+id, plane);
  }
}
