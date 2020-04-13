import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RentCarService } from '../../rent-a-car.service';
import { Car } from 'src/app/models/Car.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cars-cards',
  templateUrl: './cars-cards.component.html',
  styleUrls: ['./cars-cards.component.css']
})

export class CarsCardsComponent implements OnInit,OnDestroy {

  @Input('cars') cars:Car[];
  searchParamsSubscription:Subscription;

  constructor(private route:ActivatedRoute,private rentCarsService:RentCarService){}

  ngOnInit(){
    this.searchParamsSubscription = this.rentCarsService.searchCarsParamsSubject.subscribe((params:{}) =>{
      this.cars = this.rentCarsService.getCarsSearch(params);
    })
  }

  ngOnDestroy(): void {
    this.searchParamsSubscription.unsubscribe();
  }

}
