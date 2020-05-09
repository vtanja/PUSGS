import { Component, OnInit, OnDestroy } from '@angular/core';
import { Airline } from 'src/app/models/airline.model';
import { Subscription } from 'rxjs';
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

  constructor(private activeRoute:ActivatedRoute, private airlineService:AirlineService) { }

  ngOnInit(): void {

    this.mySubscription = this.activeRoute.params.subscribe((params:Params)=>
      {
        this.airlineCompany = this.airlineService.getAirline(+params['id']);
        this.navItemInfo = {
          'name' : this.airlineCompany.name,
          'logo' : this.airlineCompany.image,
          'companyType' : 'Airline'
        }
      }
    )
  }

  ngOnDestroy(){
    this.mySubscription.unsubscribe();
  }

}
