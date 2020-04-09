import { Injectable } from '@angular/core';
import { Airline } from '../models/airline';
import { Flight } from '../models/flight';

@Injectable()
export class AirlineService{
    private airlines:Airline[]=[];

    constructor(){
        this.loadAirlines();
    }

    loadAirlines(){
        const f1 = new Flight(0, 'Belgrade', '1.1.2001.', 'Vienna', '1.1.2001.', 1, 0, [], 120, 5);
        const f2 = new Flight(1, 'Belgrade', '2.1.2001.', 'Zurich', '2.1.2001.', 1, 0, [], 130, 4);
        const f3 = new Flight(2, 'Belgrade', '1.1.2001.', 'Amsterdam', '1.1.2001.', 3, 0, [], 120, 2);
        const f4 = new Flight(3, 'Belgrade', '1.1.2001.', 'Berlin', '1.1.2001.', 2, 0, [], 120, 5);
        const f5 = new Flight(4, 'Belgrade', '1.1.2001.', 'London', '1.1.2001.', 4, 0, [], 120, 5);
        const f6 = new Flight(5, 'Belgrade', '1.1.2001.', 'New York', '1.1.2001.', 16, 1, ['Frankfurt'], 600, 5);

        const a1 = new Airline(0, 'Airline1', 'Belgrade, Serbia', 'Airline 1 description', 5, [f1, f2, f3, f4, f5, f6], ['Vienna', 'London','NewYork'], "../../assets/images/airlines/airline1.png" );
        const a2 = new Airline(1, 'Airline2', 'Novi Sad, Serbia', 'Airline 2 description', 4, [f2, f3, f4, f5, f6], ['Zurich', 'London','NewYork'], "../../assets/images/airlines/airline2.png" );

        this.airlines.push(a1);
        this.airlines.push(a2);
    }

    getAirlines(){
        console.log(this.airlines);
        return this.airlines.slice();
    }
}