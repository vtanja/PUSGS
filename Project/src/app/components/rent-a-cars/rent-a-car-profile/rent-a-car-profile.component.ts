import { Component, OnInit, ViewChild, Input, OnDestroy } from '@angular/core';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { RentCar } from 'src/app/models/rent-a-car.model';
import { Subscription, Subject } from 'rxjs';
import { RentCarService } from '../../../services/rent-a-car.service';
import { UserService } from 'src/app/services/user-service.service';
import { Address } from 'src/app/models/address';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-rent-a-car-profile',
  templateUrl: './rent-a-car-profile.component.html',
  styleUrls: ['./rent-a-car-profile.component.css']
})
export class RentACarProfileComponent implements OnInit,OnDestroy{

  carCompany:RentCar;
  mySubscription:Subscription;
  navItemInfo:any;
  showMapToggled:boolean;
  showMapOfficesToggled:boolean;
  subjj:Subject<boolean>;
  changeMapMarker:Subscription;
  mapMarkers:Address[];
  isSpining:boolean ;

  @ViewChild('carousel', {static : true}) carousel: NgbCarousel;
  constructor(private route:ActivatedRoute, private router:Router,
    private userService:UserService,private rentCarsService:RentCarService,
    private spinner: NgxSpinnerService){}

  ngOnInit(){

    this.showMapToggled=false;
    this.showMapOfficesToggled=false;

     this.mySubscription = this.route.params.subscribe((params:Params)=>{
       this.showSpinner();
      this.rentCarsService.getRentCarCompany(params['id']).subscribe(
        (succ:any) => {
          this.hideSpinner();
          this.carCompany = succ;
          this.navItemInfo={
            'name':this.carCompany.name,
            'logo':this.carCompany.logo,
            'companyType':'RentCar'
          };

          this.mapMarkers = this.carCompany.getOfficesAddresses();
        },
        (err:any)=>{
          this.hideSpinner();
          console.log(err.errors.message);
        }
      )

    })

    this.changeMapMarker = this.userService.changeMap.subscribe((address)=>{
      if(!this.showMapOfficesToggled){
      this.showMapOfficesToggled = true;
      this.mapMarkers =[];
      this.mapMarkers.push(address);
      }
    })

  }

  showAllOfficesToggle():void{
    this.showMapOfficesToggled = !this.showMapOfficesToggled;
    this.mapMarkers = this.carCompany.getOfficesAddresses();
  }

  ngOnDestroy(){
    this.mySubscription.unsubscribe();
    this.changeMapMarker.unsubscribe();
  }

  onInnerRouteChange(route:string){
    document.getElementById(route).scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
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
