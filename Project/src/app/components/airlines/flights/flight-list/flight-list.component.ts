import { Component, OnInit, OnChanges } from '@angular/core';
import { Flight } from 'src/app/models/flight.model';
import { AirlineService } from '../../../../services/airline.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FlightService } from 'src/app/services/flight.service';
import { Subscription } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { RoundFlight } from 'src/app/models/round-flight.model';

@Component({
  selector: 'app-flight-list',
  templateUrl: './flight-list.component.html',
  styleUrls: ['./flight-list.component.css']
})
export class FlightListComponent implements OnInit {

  flights:Flight[]=[];
  roundFlights: RoundFlight[]=[];
  paramsSubscription: Subscription;
  
  isSpining:boolean ;

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



  constructor(private flightService:FlightService, private route:ActivatedRoute, private router:Router, private spinner: NgxSpinnerService) {}

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    this.flightService.filter.subscribe((filter:{airlines:{name:string, isChecked:boolean}[], duration:number, price:number, stops:number[] })=>{
      this.filterFlight=filter;
      console.log(this.filterFlight+ " from changes");
    });

  }

  ngOnInit(): void {

    this.flightService.filter.subscribe((filter:{airlines:{name:string, isChecked:boolean}[], duration:number, price:number, stops:number[] })=>{
       this.filterFlight = {...filter};
       this.filterFlightRound = {...filter};
    });

   

      this.route.queryParams.subscribe((queryParams:Params)=>{
        this.params=queryParams;
  
        let params =
          "departureDate=" + queryParams.departureDate +
          "&returnDate=" + queryParams.returnDate +
          "&takeOffLocation=" + queryParams.takeOffLocation +
          "&landingLocation=" + queryParams.landingLocation +
          "&passengers=" + queryParams.passengers +
          "&Class=" + queryParams.class;
          ;
  
          if(queryParams.criteria==='oneWay'){
                this.showSpinner();
                this.flightService.searchOneWayFlights(params).subscribe(
                    res=>{
                    this.flights = res;
                    this.roundFlights=[];
                    this.hideSpinner();
                  },
                  err=>{
                    this.hideSpinner();
                  }
                );
          }
          else if(queryParams.criteria==='multi'){
            this.showSpinner();
                this.flightService.searchMultiFlights(params).subscribe(
                    res=>{
                    this.flights = res;
                    this.roundFlights=[];
                    this.hideSpinner();
                  },
                  err=>{
                    this.hideSpinner();
                  }
                );
          }
          else{
            this.showSpinner();
                this.flightService.searchRoundFlights(params).subscribe(
                    res=>{
                      console.log(res);
                    this.roundFlights = res;
                    this.flights=[];
                    this.hideSpinner();
                  },
                  err=>{
                    this.hideSpinner();
                  }
                );
          }
        
        });

  }

  showSpinner(){
    this.isSpining = true;
    this.spinner.show();
  }
  
  hideSpinner(){
    this.spinner.hide();
    this.isSpining = false;
  }
}
