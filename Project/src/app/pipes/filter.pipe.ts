import { Pipe, PipeTransform } from '@angular/core';
import { Flight } from 'src/app/models/flight.model';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {


  transform(flights: Flight[], filter:{ airlines:{name:string, isChecked:boolean}[], duration:number, price:number, stops:number[]}):Flight[]  {
    console.log(filter);
    var result:Flight[]=[];
    var companySuites:boolean=true;
    var foundOne = false;

    if (filter===undefined){
      return flights;
    }

    const noStopsIndex=filter.stops.indexOf(0);
    const oneStopIndex=filter.stops.indexOf(1);
    const twoStopsIndex=filter.stops.indexOf(2);

    for(const flight of flights){
      flight.segmentPrices.forEach(element => {
        if(element.price <= filter.price){
          foundOne = true;
        }
      });

      if(!foundOne){
        continue;
      }

      if(flight.duration>filter.duration){
        continue;
      }

      for(const company of filter.airlines){
        if(flight.plane.airline.name===company.name){

          if(!company.isChecked){
            companySuites=false;
            continue;
          }
        }
      }
      if(!companySuites){
        continue;
      }
      if(flight.connections.length===0){
        if(noStopsIndex===-1){
          continue;
        }
      }
      else if(flight.connections.length===1){
        if(oneStopIndex===-1){
          continue;
        }
      }
      else{
        if(twoStopsIndex===1){
          continue;
        }
      }

      result.push(flight);


    }
    return result;
  }

}
