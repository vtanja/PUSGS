import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Airline } from 'src/app/models/airline.model';
import { Subscription, from } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { AirlineService } from '../../services/airline.service';

@Component({
  selector: 'app-airline-profile',
  templateUrl: './airline-profile.component.html',
  styleUrls: ['./airline-profile.component.css']
})
export class AirlineProfileComponent implements OnInit,OnDestroy {

  airlineCompany:Airline;
  mySubscription:Subscription;
  navItemInfo:any;
  showMapToggled:boolean;

  constructor(private activeRoute:ActivatedRoute, private airlineService:AirlineService) { 

  }
 
  ngOnInit(): void {

    this.showMapToggled=false;
    //this.showMapOfficesToggled=false;

    this.mySubscription = this.activeRoute.params.subscribe((params:Params)=>{
      this.airlineService.getAirline(params['id']).subscribe(
        (succ:Airline) => {
          console.log(succ);
          this.airlineCompany = succ;
          console.log(this.airlineCompany);
          
          this.navItemInfo={
            'name':this.airlineCompany.name,
            'logo':'../../../assets/images/airlines/'+this.airlineCompany.image,
            'companyType':'Airline'
          };
        },
        (err:any)=>{}
      )

    })
  }

  ngOnDestroy(){
    this.mySubscription.unsubscribe();
  }

}
