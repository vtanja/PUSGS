import { Injectable } from '@angular/core';
import { Airline } from '../models/airline';
import { Flight } from '../models/flight';
import { Subject } from 'rxjs';

@Injectable()
export class AirlineService{
    private airlines:Airline[];

    filter=new Subject<{}>();
    
    constructor(){
        this.loadAirlines();

    }

    loadAirlines(){
        this.airlines=[];

        const f1 = new Flight(0, 'BGD', 'VIE', "10-4-2020", "10-4-2020",'10:00','11:00', 1, 0, [], 120, 5, 201, 51, 101, 71, "Airline1");
        

        const f12 = new Flight(1, 'BGD', 'VIE', "10-4-2020", "10-4-2020",'11:00','12:00', 1, 0, [], 120, 5,  202, 52, 102, 72,  "Airline1");
        
        const f13 = new Flight(2, 'BGD', 'VIE', "10-4-2020", "10-4-2020",'16:00','17:00', 1, 0, [], 110, 4.5, 203, 54, 103, 73,  "Airline1");
        

        const f14 = new Flight(3, 'BGD', 'VIE', "11-4-2020", "11-4-2020",'16:00','17:00', 1, 0, [], 110, 4.5, 200, 50, 100, 70, "Airline1");
       

        const f15 = new Flight(4, 'VIE', 'BGD', "10-4-2020", "10-4-2020",'9:00','10:00', 1, 0, [], 120, 5, 200, 50, 100, 70, "Airline1");
        
        const f16 = new Flight(5, 'VIE', 'BGD', "10-4-2020", "10-4-2020",'11:00','12:00', 1, 0, [], 120, 5, 200, 50, 100, 70, "Airline1");

        const f17 = new Flight(6, 'VIE', 'BGD', "10-4-2020", "10-4-2020",'16:00','17:00', 1, 0, [], 110, 4.5, 200, 50, 100, 70, "Airline1");
       
        const f18 = new Flight(7, 'VIE', 'BGD', "11-4-2020", "11-4-2020",'18:00','19:00', 1, 0, [], 110, 4.5, 200, 50, 100, 70,  "Airline1");
        
        const f2 = new Flight(8, 'BGD', 'ZRH', "11-4-2020", "11-4-2020",'10:00','11:00', 1, 0, [], 110, 4.5, 200, 50, 100, 70,  "Airline1");
        const f21 = new Flight(9, 'BGD', 'ZRH', "12-4-2020", "12-4-2020",'10:00','11:00', 1, 0, [], 110, 4.5, 200, 50, 100, 70,  "Airline1");
        const f22 = new Flight(10, 'BGD', 'ZRH', "10-4-2020", "10-4-2020",'10:00','11:00', 1, 0, [], 110, 4.5, 200, 50, 100, 70,  "Airline1");
        const f23= new Flight(11, 'BGD', 'ZRH', "10-4-2020", "10-4-2020",'15:00','16:00', 1, 0, [], 110, 4.5, 200, 50, 100, 70,  "Airline1");

        
        const f24 = new Flight(12, 'ZRH', 'BGD', "11-4-2020", "11-4-2020",'10:00','11:00', 1, 0, [], 110, 4.5, 200, 50, 100, 70,  "Airline1");
        const f25 = new Flight(13, 'ZRH', 'BGD', "12-4-2020", "12-4-2020",'10:00','11:00', 1, 0, [], 110, 4.5, 200, 50, 100, 70,  "Airline1");
        const f26 = new Flight(14, 'ZRH', 'BGD', "10-4-2020", "10-4-2020",'10:00','11:00', 1, 0, [], 110, 4.5, 200, 50, 100, 70,  "Airline1");
        const f27= new Flight(15, 'ZRH', 'BGD', "10-4-2020", "10-4-2020",'15:00','16:00', 1, 0, [], 110, 4.5, 200, 50, 100, 70,  "Airline1");

        const f3 = new Flight(8, 'BGD', 'AMS', "11-4-2020", "11-4-2020",'10:00','11:00', 1, 0, [], 110, 4.5, 200, 50, 100, 70,  "Airline1");
        const f31 = new Flight(9, 'BGD', 'AMS', "12-4-2020", "12-4-2020",'10:00','11:00', 1, 0, [], 110, 4.5, 200, 50, 100, 70,  "Airline1");
        const f32 = new Flight(10, 'BGD', 'AMS', "10-4-2020", "10-4-2020",'10:00','11:00', 1, 0, [], 110, 4.5, 200, 50, 100, 70,  "Airline1");
        const f33= new Flight(11, 'BGD', 'AMS', "10-4-2020", "10-4-2020",'15:00','16:00', 1, 0, [], 110, 4.5, 200, 50, 100, 70,  "Airline1");

        
        const f34 = new Flight(12, 'AMS', 'BGD', "11-4-2020", "11-4-2020",'10:00','11:00', 1, 0, [], 110, 4.5, 200, 50, 100, 70,  "Airline1");
        const f35 = new Flight(13, 'AMS', 'BGD', "12-4-2020", "12-4-2020",'10:00','11:00', 1, 0, [], 110, 4.5, 200, 50, 100, 70,  "Airline1");
        const f36 = new Flight(14, 'AMS', 'BGD', "10-4-2020", "10-4-2020",'10:00','11:00', 1, 0, [], 110, 4.5, 200, 50, 100, 70,  "Airline1");
        const f37= new Flight(15, 'ZAMSRH', 'BGD', "10-4-2020", "10-4-2020",'15:00','16:00', 1, 0, [], 110, 4.5, 200, 50, 100, 70,  "Airline1");

        
        // const f4 = new Flight(3, 'BGD', 'TXL', '1.1.2001.', '1.1.2001.','10:00','12:00', 2, 0, [], 120, 5);
        // const f5 = new Flight(4, 'BGD', 'LHR', '1.1.2001.', '1.1.2001.','10:00', '14:00', 4, 0, [], 120, 5);
        // const f6 = new Flight(5, 'BGD', 'JFK', '1.1.2001.', '2.1.2001.','10:00','10:00', 16, 1, ['Frankfurt'], 600, 5);

        // const f7 = new Flight(5, 'JFK', 'BGD', '2.1.2001.', '3.1.2001.','10:00','10:00', 16, 1, ['Frankfurt'], 600, 5);
        // const f8 = new Flight(4, 'LHR', 'BGD', '2.1.2001.', '2.1.2001.','10:00', '14:00', 4, 0, [], 120, 5);

        const a1 = new Airline(0, 'Airline1', 'Belgrade, Serbia', 'Airline 1 description', 5, [f1, f12, f13, f14,f15,f16,f17,f18,f2,f21,f22,f23], ['Vienna', 'London','NewYork'], "../../assets/images/airlines/airline1.png" );
        const a2 = new Airline(1, 'Airline2', 'Novi Sad, Serbia', 'Airline 2 description', 4, [f3,f31,f32,f33,f34,f35,f36,f37, f25,f26,f27], ['Zurich', 'London','NewYork'], "../../assets/images/airlines/airline2.png" );

        f1.image=a1.image;
        f12.image=a1.image;
        f13.image=a1.image;
        f14.image=a1.image;
        f15.image=a1.image;
        f16.image=a1.image;
        f17.image=a1.image;
        f18.image=a1.image;
        f2.image=a1.image;
        f22.image=a1.image;
        f23.image=a1.image;
        f24.image=a1.image;
        f25.image=a2.image;
        f26.image=a2.image;
        f27.image=a2.image;
        f3.image=a2.image;
        f32.image=a2.image;
        f33.image=a2.image;
        f34.image=a2.image;
        f35.image=a2.image;
        f36.image=a2.image;
        f37.image=a2.image;

        this.airlines.push(a1);
        //this.airlines.push(a2);
    }

    getAirlines(){
        return this.airlines.slice();
    }

    getFlights(params:any):Flight[]{
        var result:Flight[]=[];

        if(params===undefined){
            return result;
        }

        console.log(params);
        const departureDate=params.departureDate.trim();
        const takeOffLocation=params.takeOffLocation.trim();
        const landingLocation=params.landingLocation.trim();
        const flightClass=params.class.trim();
        const passengers= +params.passengers;

        console.log(departureDate,' ', takeOffLocation,' ', landingLocation,' ', flightClass,' ', passengers);

        var i:number=0;
        var j:number=0;

        for(const company of this.airlines){
            console.log(company);
            j=0;
            for(const flight of company.flights){

                console.log(this.airlines[i].flights[j]);

                if(takeOffLocation!='' && takeOffLocation!=undefined){
                    if(flight.takeOffLocation.toLowerCase()!==takeOffLocation.toLowerCase()){
                        continue;
                    }
                }
                
                if(departureDate!='' && departureDate!=undefined){
                    if(flight.takeOffDate !== departureDate){
                         continue;
                     }    
                }

                if(landingLocation!='' && landingLocation!=undefined){
                    if(flight.landingLocation.toLowerCase()!==landingLocation.toLowerCase()){
                        continue;
                    }
                }

                
                if(flightClass !='' && flightClass!=undefined && passengers!=NaN && passengers!=undefined){
                    if(flightClass.toLowerCase()==='economy' && flight.economySeats<passengers){
                        continue;
                    }

                    if(flightClass.toLowerCase()==='premium economy' && flight.premiumEconomySeats<passengers){
                        continue;
                    }
                    
                    if(flightClass.toLowerCase()==='business class' && flight.businessSeats<passengers){
                        continue;
                    }
    
                    
                    if(flightClass.toLowerCase()==='first class' && flight.firstClassSeats<passengers){
                        continue;
                    }
                }
                
                result.push(flight);
                ++j;
            }
            ++i;
        }
        return result;
    }

    getRoundFlights(params:any):{toFlight:Flight, backFlight:Flight}[]{
        
        var toFlights:Flight[]=[];
        var returnFlights:Flight[]=[]; 
        var result:{toFlight:Flight,backFlight:Flight}[]=[];
        //console.log(params);
        toFlights=this.getTickets(params.departureDate, params.takeOffLocation,params.landingLocation, params.flightClass, +params.passengers);
        returnFlights=this.getTickets(params.returnDate, params.landingLocation,params.takeOffLocation, params.flightClass, +params.passengers);

        console.log(toFlights);
        console.log('----------------');
        console.log(returnFlights);

        result=this.getRoundTickets(toFlights,returnFlights);

        return result;
    }

    getTickets(takeOffDate:string, takeOffLocation:string, landingLocation:string, flightClass:string, passengers:number){
        var result:Flight[]=[];

        var i:number=0;
        var j:number=0;

        for(const company of this.airlines){
            j=0;
            for(const flight of company.flights){


                if(takeOffLocation!='' && takeOffLocation!=undefined){
                    if(flight.takeOffLocation.toLowerCase()!==takeOffLocation.toLowerCase()){
                        continue;
                    }
                }
                
                if(takeOffDate!='' && takeOffDate!=undefined){
                    if(flight.takeOffDate !== takeOffDate){
                         continue;
                     }    
                }

                if(landingLocation!='' && landingLocation!=undefined){
                    if(flight.landingLocation.toLowerCase()!==landingLocation.toLowerCase()){
                        continue;
                    }
                }

                
                if(flightClass !='' && flightClass!=undefined && passengers!=NaN && passengers!=undefined){
                    if(flightClass.toLowerCase()==='economy' && flight.economySeats<passengers){
                        continue;
                    }

                    if(flightClass.toLowerCase()==='premium economy' && flight.premiumEconomySeats<passengers){
                        continue;
                    }
                    
                    if(flightClass.toLowerCase()==='business class' && flight.businessSeats<passengers){
                        continue;
                    }
    
                    
                    if(flightClass.toLowerCase()==='first class' && flight.firstClassSeats<passengers){
                        continue;
                    }
                }
                
                result.push(flight);
                ++j;
            }
            ++i;
        }
        return result;
    }

    getRoundTickets(toTickets:Flight[], backTickets:Flight[]):{toFlight:Flight, backFlight:Flight}[]
    {
        var result:{toFlight:Flight, backFlight:Flight}[]=[];

        for (const item1 of toTickets){
            var dateParts1:string[]=item1.landingDate.split('-');
            let item1landingDate:Date = new Date(dateParts1[2]+"-"+dateParts1[1]+"-"+dateParts1[0]);

            for(const item2 of backTickets){
                var dateParts2:string[]=item2.takeOffDate.split('-');
                let item2takeOffDate:Date = new Date(dateParts2[2]+"-"+dateParts2[1]+"-"+dateParts2[0]);

                if(item2takeOffDate.getDate()<item1landingDate.getDate()){
                    continue;
                }

                if(item2takeOffDate.getDate() ===item1landingDate.getDate()){
                    console.log('isti datumi');
                    if(+item2.takeOffTime.split(':')[0] < +item1.landingTime.split(':')[0]){
                        console.log('manji sat');
                        continue;
                    }
                    else if(+item2.takeOffTime.split(':')[0] === +item1.landingTime.split(':')[0]){
                        console.log('isti sat');
                        if(+item2.takeOffTime.split(':')[1] <= +item1.landingTime.split(':')[1]){
                            console.log('manji min');
                            continue;
                        }
                    }
                   
                }

                result.push({toFlight:item1, backFlight:item2});
                
                
            }
        }

        return result;
    }
}
