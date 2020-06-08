import { Injectable } from '@angular/core';
import { Airline } from '../models/airline.model';
import { Flight } from '../models/flight.model';
import { Subject, Observable, of } from 'rxjs';
import { Address } from '../models/address';
import { UsersRate } from '../models/users-rate.model';
import { Airport } from '../models/airport';
import { Plane } from '../models/plane';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { AirlineAdapter } from '../models/adapters/airline.adapter';
import { AirlineProfileAdapter } from '../models/adapters/airline-profile.adapter';

@Injectable()
export class AirlineService{
    private airlines:Airline[];

    filter=new Subject<{}>();
    rateModalClose = new Subject();
    
    readonly baseUri = 'http://localhost:51474/api/';

    constructor(private httpClient:HttpClient, private airlineAdapter:AirlineAdapter, private airlineprofileAdapter:AirlineProfileAdapter){
        
    }

    getAirlineId(id:string){
        return this.httpClient.get(this.baseUri+'Airlines/GetId'+id);
    }

   
    
    findFlights(airlineid:number, planename:string):Flight[]{
        let retVal:Flight[]=[];

        let airline=this.getAirline(airlineid);
        // if(airline!==undefined){
        //     let plane=airline.planes.find(p=>p.name===planename);
        //     if(plane!==undefined){
        //         for(let flight of airline.flights){
        //             if(flight.planename===planename){
        //                 retVal.push(flight);
        //             }
        //         }
        //     }
        // }

        return retVal;
    }



    getAirlines():Observable<Airline[]>{
        return this.httpClient.get(this.baseUri+'Airlines')
        .pipe(
            map((data:any)=>
            data.map(item=>this.airlineAdapter.adapt(item)
            )
          )
        )
    }

    getAirline(id:number){
        console.log('get airline: ' ,id);
        return this.httpClient.get(this.baseUri + 'Airlines/GetAirlineById/'+id)
        .pipe(
            map(data=>this.airlineprofileAdapter.adapt(data))
        );
    }
    

    

    // getFlights(params:any):Flight[]{
    //     var result:Flight[]=[];

    //     if(params===undefined){
    //         return result;
    //     }

    //     const departureDate=params.departureDate.trim();
    //     const takeOffLocation=params.takeOffLocation.trim();
    //     const landingLocation=params.landingLocation.trim();
    //     const flightClass=params.class.trim();
    //     const passengers= +params.passengers;

    //     var i:number=0;
    //     var j:number=0;

    //     for(const company of this.airlines){
    //         j=0;
    //         for(const flight of company.flights){

    //             console.log(flight);

    //             if(takeOffLocation!='' && takeOffLocation!=undefined){
    //                 if(flight.takeOffLocation.code.toLowerCase()!==takeOffLocation.toLowerCase()){
    //                     continue;
    //                 }
    //             }

    //             if(departureDate!='' && departureDate!=undefined){
    //                 if(flight.takeOffDate !== departureDate){
    //                      continue;
    //                  }
    //             }

    //             if(landingLocation!='' && landingLocation!=undefined){
    //                 if(flight.landingLocation.code.toLowerCase()!==landingLocation.toLowerCase()){
    //                     continue;
    //                 }
    //             }


    //             if(flightClass !='' && flightClass!=undefined && passengers!=NaN && passengers!=undefined){
    //                 if(flightClass.toLowerCase()==='economy' && flight.economySeats<passengers){
    //                     continue;
    //                 }

    //                 if(flightClass.toLowerCase()==='premium economy' && flight.premiumEconomySeats<passengers){
    //                     continue;
    //                 }

    //                 if(flightClass.toLowerCase()==='business class' && flight.businessSeats<passengers){
    //                     continue;
    //                 }


    //                 if(flightClass.toLowerCase()==='first class' && flight.firstClassSeats<passengers){
    //                     continue;
    //                 }
    //             }

    //             result.push(flight);
    //             ++j;
    //         }
    //         ++i;
    //     }
    //     return result;
    // }

    // getRoundFlights(params:any):{toFlight:Flight, backFlight:Flight}[]{

    //     var toFlights:Flight[]=[];
    //     var returnFlights:Flight[]=[];
    //     var result:{toFlight:Flight,backFlight:Flight}[]=[];
    //     //console.log(params);
    //     toFlights=this.getTickets(params.departureDate, params.takeOffLocation,params.landingLocation, params.flightClass, +params.passengers);
    //     returnFlights=this.getTickets(params.returnDate, params.landingLocation,params.takeOffLocation, params.flightClass, +params.passengers);

    //     console.log(toFlights);
    //     console.log('----------------');
    //     console.log(returnFlights);

    //     result=this.getRoundTickets(toFlights,returnFlights);

    //     return result;
    // }

    // getTickets(takeOffDate:string, takeOffLocation:string, landingLocation:string, flightClass:string, passengers:number){
    //     var result:Flight[]=[];

    //     var i:number=0;
    //     var j:number=0;

    //     for(const company of this.airlines){
    //         j=0;
    //         for(const flight of company.flights){


    //             if(takeOffLocation!='' && takeOffLocation!=undefined){
    //                 if(flight.takeOffLocation.code.toLowerCase()!==takeOffLocation.toLowerCase()){
    //                     continue;
    //                 }
    //             }

    //             if(takeOffDate!='' && takeOffDate!=undefined){
    //                 if(flight.takeOffDate !== takeOffDate){
    //                      continue;
    //                  }
    //             }

    //             if(landingLocation!='' && landingLocation!=undefined){
    //                 if(flight.landingLocation.code.toLowerCase()!==landingLocation.toLowerCase()){
    //                     continue;
    //                 }
    //             }


    //             if(flightClass !='' && flightClass!=undefined && passengers!=NaN && passengers!=undefined){
    //                 if(flightClass.toLowerCase()==='economy' && flight.economySeats<passengers){
    //                     continue;
    //                 }

    //                 if(flightClass.toLowerCase()==='premium economy' && flight.premiumEconomySeats<passengers){
    //                     continue;
    //                 }

    //                 if(flightClass.toLowerCase()==='business class' && flight.businessSeats<passengers){
    //                     continue;
    //                 }


    //                 if(flightClass.toLowerCase()==='first class' && flight.firstClassSeats<passengers){
    //                     continue;
    //                 }
    //             }

    //             result.push(flight);
    //             ++j;
    //         }
    //         ++i;
    //     }
    //     return result;
    // }

    // getRoundTickets(toTickets:Flight[], backTickets:Flight[]):{toFlight:Flight, backFlight:Flight}[]
    // {
    //     var result:{toFlight:Flight, backFlight:Flight}[]=[];

    //     for (const item1 of toTickets){
    //         var dateParts1:string[]=item1.landingDate.split('-');
    //         let item1landingDate:Date = new Date(dateParts1[2]+"-"+dateParts1[1]+"-"+dateParts1[0]);

    //         for(const item2 of backTickets){
    //             var dateParts2:string[]=item2.takeOffDate.split('-');
    //             let item2takeOffDate:Date = new Date(dateParts2[2]+"-"+dateParts2[1]+"-"+dateParts2[0]);

    //             if(item2takeOffDate.getDate()<item1landingDate.getDate()){
    //                 continue;
    //             }

    //             if(item2takeOffDate.getDate() ===item1landingDate.getDate()){
    //                 console.log('isti datumi');
    //                 if(+item2.takeOffTime.split(':')[0] < +item1.landingTime.split(':')[0]){
    //                     console.log('manji sat');
    //                     continue;
    //                 }
    //                 else if(+item2.takeOffTime.split(':')[0] === +item1.landingTime.split(':')[0]){
    //                     console.log('isti sat');
    //                     if(+item2.takeOffTime.split(':')[1] <= +item1.landingTime.split(':')[1]){
    //                         console.log('manji min');
    //                         continue;
    //                     }
    //                 }

    //             }

    //             result.push({toFlight:item1, backFlight:item2});


    //         }
    //     }

    //     return result;
    // }

    addFlightRate(companyID:number,flightID:number,flightRate:UsersRate){
      this.airlines.find(r=>r.id===companyID).flights.find(f=>f.id===flightID).addRate(flightRate);
    }

    addCompanyRate(companyID:number,rate:UsersRate){
      this.airlines.find(r=>r.id===companyID).addRate(rate);
    }
}
