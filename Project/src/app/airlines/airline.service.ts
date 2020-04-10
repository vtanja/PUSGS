import { Injectable } from '@angular/core';
import { Airline } from '../models/airline';
import { Flight } from '../models/flight';

@Injectable()
export class AirlineService{
    private airlines:Airline[]=[];
    private flights:Flight[]=[];
    private roundFlights:{toFlight:Flight, backFlight:Flight}[]=[];

    constructor(){
        this.loadAirlines();
        
    }

    loadAirlines(){
        
        const f1 = new Flight(0, 'BGD', 'VIE', '1.1.2001.', '1.1.2001.','10:00','11:00', 1, 0, [], 120, 5);
        const f2 = new Flight(1, 'BGD', 'ZRH', '2.1.2001.', '2.1.2001.','10:00','11:00', 1, 0, [], 130, 4);
        const f3 = new Flight(2, 'BGD', 'AMS', '1.1.2001.', '1.1.2001.','10:00','13:00', 3, 0, [], 120, 2);
        const f4 = new Flight(3, 'BGD', 'TXL', '1.1.2001.', '1.1.2001.','10:00','12:00', 2, 0, [], 120, 5);
        const f5 = new Flight(4, 'BGD', 'LHR', '1.1.2001.', '1.1.2001.','10:00', '14:00', 4, 0, [], 120, 5);
        const f6 = new Flight(5, 'BGD', 'JFK', '1.1.2001.', '2.1.2001.','10:00','10:00', 16, 1, ['Frankfurt'], 600, 5);

        const f7 = new Flight(5, 'JFK', 'BGD', '2.1.2001.', '3.1.2001.','10:00','10:00', 16, 1, ['Frankfurt'], 600, 5);
        const f8 = new Flight(4, 'LHR', 'BGD', '2.1.2001.', '2.1.2001.','10:00', '14:00', 4, 0, [], 120, 5);

        const a1 = new Airline(0, 'Airline1', 'Belgrade, Serbia', 'Airline 1 description', 5, [f1, f2, f3], ['Vienna', 'London','NewYork'], "../../assets/images/airlines/airline1.png" );
        const a2 = new Airline(1, 'Airline2', 'Novi Sad, Serbia', 'Airline 2 description', 4, [f5, f6], ['Zurich', 'London','NewYork'], "../../assets/images/airlines/airline2.png" );

        f1.image=a1.image;
        f2.image=a1.image;
        f3.image=a1.image;
        f4.image=a2.image;
        f5.image=a2.image;
        f6.image=a2.image;
        f7.image=a2.image;
        f8.image=a2.image;

        this.airlines.push(a1);
        this.airlines.push(a2);

        this.flights.push(f1);
        this.flights.push(f2);
        this.flights.push(f3);
        this.flights.push(f4);
        this.flights.push(f5);
        this.flights.push(f6);

        this.roundFlights.push({toFlight:f5,backFlight:f8});
        this.roundFlights.push({toFlight:f6,backFlight:f7});
    }

    getAirlines(){
        console.log(this.airlines);
        return this.airlines.slice();
    }

    getFlights(){
        return this.flights.slice();
    }

    getRoundFlights(){
        return this.roundFlights.slice();
    }
}