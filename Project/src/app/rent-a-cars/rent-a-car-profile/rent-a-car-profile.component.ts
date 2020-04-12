import { Component, OnInit, ViewChild, Input, OnDestroy } from '@angular/core';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { RentCar } from 'src/app/models/rent-a-car.model';
import { Subscription } from 'rxjs';
import { RentCarService } from '../rent-a-car.service';

@Component({
  selector: 'app-rent-a-car-profile',
  templateUrl: './rent-a-car-profile.component.html',
  styleUrls: ['./rent-a-car-profile.component.css']
})
export class RentACarProfileComponent implements OnInit,OnDestroy{

  carCompany:RentCar;
  mySubscription:Subscription;
  navItemInfo:any;

  @ViewChild('carousel', {static : true}) carousel: NgbCarousel;
  constructor(private route:ActivatedRoute, private router:Router,private rentCarsService:RentCarService){}

  ngOnInit(){

     this.mySubscription = this.route.params.subscribe((params:Params)=>{
      this.carCompany = this.rentCarsService.getRentCarCompany(params['id']);
      this.navItemInfo={'name':this.carCompany.name,
                        'logo':this.carCompany.logo,
                        'companyType':'RentCar'};
    })
  }

  ngOnDestroy(){
    this.mySubscription.unsubscribe();
  }

}
