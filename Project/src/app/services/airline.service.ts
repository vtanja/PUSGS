import { Injectable } from '@angular/core';
import { Airline } from '../models/airline';
import { Flight } from '../models/flight';
import { Subject } from 'rxjs';
import { Address } from '../models/address';

@Injectable()
export class AirlineService{
    private airlines:Airline[];

    filter=new Subject<{}>();
    rateModalClose = new Subject();

    constructor(){
        this.loadAirlines();

    }


    loadAirlines(){

        this.airlines=[];

        const flight1= new Flight(0, 'BEG', 'FCO', '16-4-2020', '16-4-2020', '18:05', '19:35', 1.5, 0, [], 50, 5,200,120,20,20,"Air Serbia");
        const flight2= new Flight(1, 'BEG', 'FCO', '17-4-2020', '17-4-2020', '18:05', '19:35', 1.5, 0, [], 50, 5,200,120,20,20,"Air Serbia");
        const flight3= new Flight(2, 'BEG', 'FCO', '18-4-2020', '18-4-2020', '18:05', '19:35', 1.5, 0, [], 50, 5,200,120,20,20,"Air Serbia");
        const flight4= new Flight(3, 'BEG', 'FCO', '19-4-2020', '19-4-2020', '18:05', '19:35', 1.5, 0, [], 50, 5,200,120,20,20,"Air Serbia");
        const flight5= new Flight(4, 'BEG', 'FCO', '20-4-2020', '20-4-2020', '18:05', '19:35', 1.5, 0, [], 50, 5,200,120,20,20,"Air Serbia");


        const flight26= new Flight(25, 'AMS', 'BEG', '16-4-2020', '16-4-2020', '07:00', '09:30', 2.5, 0, [], 130, 5,200,120,20,20,"Air Serbia");
        const flight27= new Flight(26, 'AMS', 'BEG', '17-4-2020', '17-4-2020', '07:00', '09:30', 2.5, 0, [], 130, 5,200,120,20,20,"Air Serbia");
        const flight28= new Flight(27, 'AMS', 'BEG', '18-4-2020', '18-4-2020', '07:00', '09:30', 2.5, 0, [], 130, 5,200,120,20,20,"Air Serbia");
        const flight29= new Flight(28, 'AMS', 'BEG', '19-4-2020', '19-4-2020', '07:00', '09:30', 2.5, 0, [], 130, 5,200,120,20,20,"Air Serbia");
        const flight30= new Flight(29, 'AMS', 'BEG', '20-4-2020', '20-4-2020', '07:00', '09:30', 2.5, 0, [], 130, 5,200,120,20,20,"Air Serbia");

        const flight6= new Flight(5, 'BEG', 'AMS', '16-4-2020', '16-4-2020', '17:50', '20:20', 2.5, 0, [], 150, 5,200,120,20,20,"Air Serbia");
        const flight7= new Flight(6, 'BEG', 'AMS', '17-4-2020', '17-4-2020', '17:50', '20:20', 2.5, 0, [], 150, 5,200,120,20,20,"Air Serbia");
        const flight8= new Flight(7, 'BEG', 'AMS', '18-4-2020', '18-4-2020', '17:50', '20:20', 2.5, 0, [], 150, 5,200,120,20,20,"Air Serbia");
        const flight9= new Flight(8, 'BEG', 'AMS', '19-4-2020', '19-4-2020', '17:50', '20:20', 2.5, 0, [], 150, 5,200,120,20,20,"Air Serbia");
        const flight10= new Flight(9, 'BEG', 'AMS', '20-4-2020', '20-4-2020', '17:50', '20:20', 2.5, 0, [], 150, 5,200,120,20,20,"Air Serbia");

        const flight11= new Flight(10, 'BEG', 'SJJ', '16-4-2020', '16-4-2020', '13:50', '14:50', 1, 0, [], 50, 5,200,120,20,20,"Air Serbia");
        const flight12= new Flight(11, 'BEG', 'SJJ', '17-4-2020', '17-4-2020', '13:50', '14:50', 1, 0, [], 50, 5,200,120,20,20,"Air Serbia");
        const flight13= new Flight(12, 'BEG', 'SJJ', '18-4-2020', '18-4-2020', '13:50', '14:50', 1, 0, [], 50, 5,200,120,20,20,"Air Serbia");
        const flight14= new Flight(13, 'BEG', 'SJJ', '19-4-2020', '19-4-2020', '13:50', '14:50', 1, 0, [], 50, 5,200,120,20,20,"Air Serbia");
        const flight15= new Flight(14, 'BEG', 'SJJ', '20-4-2020', '20-4-2020', '13:50', '14:50', 1, 0, [], 50, 5,200,120,20,20,"Air Serbia");

        const flight16= new Flight(15, 'TDG', 'VIE', '16-4-2020', '16-4-2020', '08:00', '09:30', 1.5, 0, [], 230, 5,200,120,20,20,"Montenegro Airlines");
        const flight17= new Flight(16, 'TDG', 'VIE', '17-4-2020', '17-4-2020', '08:00', '09:30', 1.5, 0, [], 230, 5,200,120,20,20,"Montenegro Airlines");
        const flight18= new Flight(17, 'TDG', 'VIE', '18-4-2020', '18-4-2020', '08:00', '09:30', 1.5, 0, [], 230, 5,200,120,20,20,"Montenegro Airlines");
        const flight19= new Flight(18, 'TDG', 'VIE', '19-4-2020', '19-4-2020', '08:00', '09:30', 1.5, 0, [], 230, 5,200,120,20,20,"Montenegro Airlines");
        const flight20= new Flight(19, 'TDG', 'VIE', '20-4-2020', '20-4-2020', '08:00', '09:30', 1.5, 0, [], 230, 5,200,120,20,20,"Montenegro Airlines");

        const flight21= new Flight(20, 'VIE', 'FRA', '16-4-2020', '16-4-2020', '11:10', '12:40', 1.5, 0, [], 50, 5,200,120,20,20,"Lufthansa");
        const flight22= new Flight(21, 'VIE', 'FRA', '17-4-2020', '17-4-2020', '11:10', '12:40', 1.5, 0, [], 50, 5,200,120,20,20,"Lufthansa");
        const flight23= new Flight(22, 'VIE', 'FRA', '18-4-2020', '18-4-2020', '11:10', '12:40', 1.5, 0, [], 50, 5,200,120,20,20,"Lufthansa");
        const flight24= new Flight(23, 'VIE', 'FRA', '19-4-2020', '19-4-2020', '11:10', '12:40', 1.5, 0, [], 50, 5,200,120,20,20,"Lufthansa");
        const flight25= new Flight(24, 'VIE', 'FRA', '20-4-2020', '20-4-2020', '11:10', '12:40', 1.5, 0, [], 50, 5,200,120,20,20,"Lufthansa");


        var airSerbiaFlights=[flight1, flight2, flight3, flight4, flight5, flight6, flight7,
            flight8, flight9, flight10, flight11, flight12, flight13, flight14, flight25, flight26, flight27, flight28, flight29];

        var montenegroFlights=[flight15, flight16, flight17, flight18, flight19];

        var lufthansaFlights=[flight20, flight21, flight22, flight23, flight24];

        const serbiaDest={
            'Netherlands':["Amsterdam", ],
            'Greece':["Athens",],
            'Bosnia and Herzegovina':["Banja Luka", "Sarajevo"],
            'Spain':["Barcelona","Madrid"],
            'Serbia':["Belgrade","Nis"],
            'Germany':["Berlin", "Dusseldorf", "Frankfurt","Hamburg", ],
            'Italy':["Bologna", "Rome", "Florence", "Milan"],
            'Croatia':["Dubrovnik" ],
            'Switzerland':["Geneva" ],
            'Turkey':["Istanbul"]
        };

          const montenegroDest={
            'Italy':["Bari","Rome" ],
            'Austria':["Vienna", ],
            'Serbia':["Belgrade"],
            'Switzerland':["Zurich", ],
            'Germany':["Dusseldorf", "Frankfurt", "Munich"],
            'France':["Lion", "Paris"],
            'United Kingdom':["London"],
            'Montenegro':["Podgorica"],
            'Russia':["Saint Petersburg", "Moscow"]
          };

          const lufthansaDest={
              'Switzerland':["Geneva", "Zurich", "Basel"],
              'Austria':["Vienna"],
              'Spain':["Madrid", "Barcelona", "Bilbao","Ibiza"],
              'Germany':["Frankfurt"],
              'Hungary':["Budapest"]
          }

          const croatiaDest={
            'Serbia':["Belgrade"],
            'Austria' :["Vienna"],
            'Croatia':["Dubrovnik","Split","Zagreb", "Osijek", "Pula", "Rijeka", "Zadar"],
            'Netherlands':["Amsterdam"],
            'Germany':["Frankfurt"],
            'Spain':["Barcelona"],
            'Belgium':["Brussels"],
            'France':["Paris"],
            'Italy':["Rome"]
        };

        const destBosnia={
            'Italy':["Rome"],
            'United Kingdom':["London"]
        };



        const airline1 = new Airline(0, "Air Serbia", new Address(" ","Beograd","Serbia"), "Air Serbia je nacionalna avio kompanije Republike Srbije, nastala iz dotadašnje avio kompanije Jat Airways.",
        4.5, airSerbiaFlights, serbiaDest, "../../assets/images/airlines/air-serbia.png");
        const airline2 = new Airline(1, "FlyBosnia", new Address(" ","Sarajevo","Bosnia and Herzegovina"), "FlyBosnia je avio kompanija iz Bosne i Hercegovina sa sedištem u Sarajevu. Avio kompanija FlyBosnia trenutno leti na direktnim linijama iz Sarajeva za London, Riyadh i Kuvajt.",
        4, [], destBosnia, "../../assets/images/airlines/Logo-FlyBosnia.png");
        const airline3 = new Airline(2, "Croatia Airlines", new Address(" ","Zagreb","Croatia"), "Croatia Airlines je nacionalna avio kompanija Republike Hrvatske, osnovana 1989. godine pod nazivom Zagal, Zagreb Airlines, a 1990. godine menja ime u Croatia Airlines.",
        3.5, [], croatiaDest, "../../assets/images/airlines/croatia.png");
        const airline4 = new Airline(3, "Montenegro Airlines", new Address(" ","Podgorica","Montenegro"), "Montenegro Airlines je nacionalna avio kompanija Crne Gore, sa sedištem u Podgorici, osnovana je u oktobru 1994. godine, a postala članica IATA 5. marta 2003. godine.",
        4, montenegroFlights, montenegroDest, "../../assets/images/airlines/montenegro.jpg");
        const airline5 = new Airline(4, "Lufthansa", new Address(" ","Frankfurt","Germany"), "Lufthansa (nem. Deutsche Lufthansa AG) je nacionalna avio-kompanija Nemačke. Sedište joj je u Frankfurtu. Trenutno je najveća aviokompanija u Evropi po broju prevezenih putnika i druga po veličini flote (posle Air France-KLM).",
        3.7, lufthansaFlights, lufthansaDest, "../../assets/images/airlines/airline1.png");

        flight1.image=airline1.image;
        flight2.image=airline1.image;
        flight3.image=airline1.image;
        flight4.image=airline1.image;
        flight5.image=airline1.image;
        flight6.image=airline1.image;
        flight7.image=airline1.image;
        flight8.image=airline1.image;
        flight9.image=airline1.image;
        flight10.image=airline1.image;
        flight11.image=airline1.image;
        flight12.image=airline1.image;
        flight13.image=airline1.image;
        flight14.image=airline1.image;
        flight25.image=airline1.image;
        flight26.image=airline1.image;
        flight27.image=airline1.image;
        flight28.image=airline1.image;
        flight29.image=airline1.image;

        flight16.image=airline4.image;
        flight17.image=airline4.image;
        flight18.image=airline4.image;
        flight19.image=airline4.image;
        flight20.image=airline4.image;

        flight20.image=airline5.image;
        flight21.image=airline5.image;
        flight22.image=airline5.image;
        flight23.image=airline5.image;
        flight24.image=airline5.image;

        this.airlines.push(airline1);
        this.airlines.push(airline2);
        this.airlines.push(airline3);
        this.airlines.push(airline4);
        this.airlines.push(airline5);

    }

    getAirlines(){
        return this.airlines.slice();
    }

    getAirline(id:number){

      var airline = this.airlines.find(a=>a.id===id);
      console.log(airline);
      return airline;
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
