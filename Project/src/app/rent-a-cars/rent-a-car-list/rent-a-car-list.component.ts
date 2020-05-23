import { Component, OnInit } from '@angular/core';
import { RentCarService } from '../../services/rent-a-car.service';
import { RentCar } from 'src/app/models/rent-a-car.model';
import { Subscription } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-rent-a-car-list',
  templateUrl: './rent-a-car-list.component.html',
  styleUrls: ['./rent-a-car-list.component.css']
})
export class RentACarListComponent implements OnInit {

  rentCars: Array<RentCar> = new Array<RentCar>(0);
  paramsSubscription: Subscription;
  sortParamsSubscription:Subscription;
  sortCriteria:string='';
  isSpining:boolean = true;

  constructor(private rentCarService:RentCarService,private spinner: NgxSpinnerService) {

   }

  ngOnInit(): void {
    this.spinner.show();
    this.rentCarService.getRentCars().subscribe(
      (res)=>{
        console.log(res);
        this.rentCars = res;
        this.spinner.hide();
        this.isSpining = false;
      },
      (err)=>{
        this.spinner.hide();
        this.isSpining = true;
      }
    );

    this.paramsSubscription= this.rentCarService.searchParamsSubject.subscribe((params:{})=>{
      this.rentCars = this.rentCarService.search(params);
    });

    this.sortParamsSubscription = this.rentCarService.sortChange.subscribe((params:string)=>{
      this.sortCriteria=params;

    })
  }

  ngOnDestroy(){
    this.paramsSubscription.unsubscribe();
    this.sortParamsSubscription.unsubscribe();
  }


}
