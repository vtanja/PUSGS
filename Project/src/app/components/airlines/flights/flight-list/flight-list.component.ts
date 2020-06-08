import { Component, OnInit, OnChanges } from '@angular/core';
import { Flight } from 'src/app/models/flight.model';
import { AirlineService } from '../../../../services/airline.service';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-flight-list',
  templateUrl: './flight-list.component.html',
  styleUrls: ['./flight-list.component.css']
})
export class FlightListComponent implements OnInit {

  flights:Flight[]=[];
  roundFlights: {toFlight:Flight, backFlight:Flight}[]=[];

   filterFlight:{
    airlines:{name:string, isChecked:boolean}[],
    duration:number,
    price:number,
    stops:number[]
  };

  filterFlightRound:{
    airlines:{name:string, isChecked:boolean}[],
    duration:number,
    price:number,
    stops:number[]
  };

  params:{};



  constructor(private airlineService:AirlineService, private route:ActivatedRoute, private router:Router) {}
  // ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
  //   this.airlineService.filter.subscribe((filter:{airlines:{name:string, isChecked:boolean}[], duration:number, price:number, stops:number[] })=>{
  //     this.filterFlight=filter;
  //     console.log(this.filterFlight+ " from changes");
  //   });

  // }

  ngOnInit(): void {

    this.airlineService.filter.subscribe((filter:{airlines:{name:string, isChecked:boolean}[], duration:number, price:number, stops:number[] })=>{
       this.filterFlight = {...filter};
       //this.filterFlightRound = {...filter};
      console.log(this.filterFlight);
    });

    //this.flights=this.airlineService.getFlights();
    //this.roundFlights=this.airlineService.getRoundFlights();
    this.route.queryParams.subscribe((queryParams:Params)=>{
      //this.params = this.activeRoute.snapshot.queryParams );
      console.log(queryParams);
      if(queryParams['returnDate']==="undefined-undefined-undefined"){
        console.log('poziv funkcije one way')
        //this.flights=this.airlineService.getFlights(queryParams);
        this.roundFlights=[];
      }
      else{
        //this.roundFlights=this.airlineService.getRoundFlights(queryParams);
        this.flights=[];
      }

      //console.log(this.flights);
    });
  }

}
