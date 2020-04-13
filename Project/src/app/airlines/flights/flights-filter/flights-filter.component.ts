import { Component, OnInit } from '@angular/core';
import { Airline } from 'src/app/models/airline';
import { AirlineService } from '../../airline.service';
import { NumberValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-flights-filter',
  templateUrl: './flights-filter.component.html',
  styleUrls: ['./flights-filter.component.css']
})
export class FlightsFilterComponent implements OnInit {
  public isCollapsedDuration=true;
  public isCollapsedStops=true;
  public isCollapsedAirlines=true;
  public isCollapsedPrice=true;

  public airlines:Airline[]=[];
  public companies:{
    name:string,
    isChecked:boolean
  }[]=[];

  private filter:{
    stops:number[],
    duration:number,
    airlines:{
      name:string,
      isChecked:boolean
    }[],
    price:number
  };

  constructor(private airlineService:AirlineService) { }

  ngOnInit(): void {
    var i:number=0;
    this.airlines=this.airlineService.getAirlines();
    for(const airline of this.airlines){
      this.companies.push({name:airline.name, isChecked:true});
    }

    this.filter= {
      airlines:this.companies.slice(),
      duration:30,
      price:500,
      stops:[0,1,2]
    };
  }

  directChanged(event){
    if(event.target.checked){
      if(!this.filter.stops.includes(0)){
        this.filter.stops.push(0);
      }
    }
    else{
      if(this.filter.stops.includes(0)){
        const index = this.filter.stops.indexOf(0);
        if (index > -1) {
           this.filter.stops.splice(index,1);
        }
      }
    }
    console.log(this.filter.stops);
    this.airlineService.filter.next(this.filter);
  }

  oneChanged(event){
    if(event.target.checked){
      if(!this.filter.stops.includes(1)){
        this.filter.stops.push(1);
      }
    }
    else{
      if(this.filter.stops.includes(1)){
        const index = this.filter.stops.indexOf(1);
        if (index > -1) {
           this.filter.stops.splice(index,1);
        }
      }
    }
    console.log(this.filter.stops);
    this.airlineService.filter.next(this.filter);
  }

  twoPlusChanged(event){
    if(event.target.checked){
      if(!this.filter.stops.includes(2)){
        this.filter.stops.push(2);
      }
    }
    else{
      if(this.filter.stops.includes(2)){
        const index = this.filter.stops.indexOf(2);
        if (index > -1) {
           this.filter.stops.splice(index,1);
        }
      }
    }
    console.log(this.filter.stops);
    this.airlineService.filter.next(this.filter);
  }

  onAirlineChange(event, index:number){
    //console.log(event);
    if(event.target.checked){
      this.filter.airlines[index].isChecked=true;
      this.companies[index].isChecked=true;
    }
    else{
      this.filter.airlines[index].isChecked=false;
      this.companies[index].isChecked=false;
    }

    console.log(this.filter.airlines);
    this.airlineService.filter.next(this.filter);
  }

  onPriceChanged(event){
    this.filter.price=event.target.value;
    this.airlineService.filter.next(this.filter);
  }

  
  onDurationChanged(event){
    console.log(event.target.value);
    this.filter.duration=event.target.value;
    this.airlineService.filter.next(this.filter);
  }
}