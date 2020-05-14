import { Pipe, PipeTransform } from '@angular/core';
import { Flight } from 'src/app/models/flight.model';

@Pipe({
  name: 'roundFlightsFilter'
})
export class RoundFlightsFilterPipe implements PipeTransform {

  transform(flights: {toFlight:Flight, backFlight:Flight}[], filter:{ airlines:{name:string, isChecked:boolean}[], duration:number, price:number, stops:number[]}): {toFlight:Flight, backFlight:Flight}[] {
    console.log(filter);
    var result:{toFlight:Flight, backFlight:Flight}[]=[];

    console.log('filter pipe');
    if (filter===undefined){
      console.log('leaving pipe')
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


      if(flight.price>filter.price || flight.duration>filter.duration){
        return false;
      }

      console.log(flight.airline);
      for(const company of filter.airlines){
        if(flight.airline.name===company.name){

          if(!company.isChecked){
            return false;
          }
        }
      }

      if(flight.numberOfChangeovers===0){
        if(noStopsIndex===-1){
          return false;
        }
      }
      else if(flight.numberOfChangeovers===1){
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
