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
        const f1 = new Flight(0, 'Belgrade','Vienna' , '10.05.2020.', '10.05.2020.','12:20','13:04', 1, 0, [], 120, 5);
        const f2 = new Flight(1, 'Belgrade','Zurich' , '10.05.2020.', '10.05.2020.','10:23','13:04', 1, 0, [], 130, 4);
        const f3 = new Flight(2, 'Belgrade','Amsterdan' , '10.05.2020.', '10.05.2020.','12:21','13:04', 3, 0, [], 120, 2);
        const f4 = new Flight(3, 'Belgrade','Berlin' , '10.05.2020.', '10.05.2020.','22:20','23:44', 2, 0, [], 120, 5);
        const f5 = new Flight(4, 'Belgrade','London' , '10.05.2020.', '10.05.2020.','14:20','16:04', 4, 0, [], 120, 5);
        const f6 = new Flight(5, 'Belgrade','New York' , '10.05.2020.', '11.05.2020.','06:20','17:34', 16, 1, ['Frankfurt'], 600, 5);

        const a1 = new Airline(0, 'Skyscanner', 'Belgrade, Serbia', 'Airline 1 description', 5, [f1, f2, f3, f4, f5, f6], ['Vienna', 'London','NewYork'], "../../assets/images/airlines/airline1.png" );
        const a2 = new Airline(1, 'W izzair', 'Novi Sad, Serbia', 'Airline 2 description', 4, [f2, f3, f4, f5, f6], ['Zurich', 'London','NewYork'], "../../assets/images/airlines/airline2.png" );

        this.airlines.push(a1);
        this.airlines.push(a2);
    }

    getAirlines(){
        console.log(this.airlines);
        return this.airlines.slice();
    }
}
