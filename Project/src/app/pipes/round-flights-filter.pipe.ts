import { Pipe, PipeTransform } from '@angular/core';
import { Flight } from 'src/app/models/flight.model';

@Pipe({
  name: 'roundFlightsFilter'
})
export class RoundFlightsFilterPipe implements PipeTransform {

  foundOne=false;

  transform(flights: {toFlight:Flight, backFlight:Flight}[], filter:{ airlines:{name:string, isChecked:boolean}[], duration:number, price:number, stops:number[]}): {toFlight:Flight, backFlight:Flight}[] {
    console.log(filter);
    var result:{toFlight:Flight, backFlight:Flight}[]=[];
    if (filter===undefined){
      return flights;
    }

    for(const flight of flights){
      if(this.checkFlight(flight.toFlight, filter) && this.checkFlight(flight.backFlight, filter)){
        result.push(flight);
      }
    }
    return result;
  }

  checkFlight(flight:Flight, filter:{ airlines:{name:string, isChecked:boolean}[], duration:number, price:number, stops:number[]}):boolean{
    const noStopsIndex=filter.stops.indexOf(0);
    const oneStopIndex=filter.stops.indexOf(1);
    const twoStopsIndex=filter.stops.indexOf(2);

      flight.segmentPrices.forEach(element => {
        if(element.price<=filter.price){
          this.foundOne = true;
        }
      });

      if(!this.foundOne){
        return false;
      }

      if(flight.duration>filter.duration){
        return false;
      }

      for(const company of filter.airlines){
        if(flight.plane.airline.name===company.name){

          if(!company.isChecked){
            return false;
          }
        }
      }

      if(flight.connections.length===0){
        if(noStopsIndex===-1){
          return false;
        }
      }
      else if(flight.connections.length===1){
        if(oneStopIndex===-1){
          return false;
        }
      }
      else{
        if(twoStopsIndex===1){
          return false;
        }
      }

      return true;

  }
}
