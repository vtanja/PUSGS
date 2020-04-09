import { Component, OnInit } from '@angular/core';
import { RentCarService } from '../rent-a-car.service';
import { RentCar } from 'src/app/models/rent-a-car.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-rent-a-car-list',
  templateUrl: './rent-a-car-list.component.html',
  styleUrls: ['./rent-a-car-list.component.css']
})
export class RentACarListComponent implements OnInit {

  rentCars: Array<RentCar>;
  paramsSubscription: Subscription;

  constructor(private rentCarService:RentCarService) {

   }

  ngOnInit(): void {
    this.rentCars = this.rentCarService.getRentCars();

    this.paramsSubscription= this.rentCarService.searchParamsSubject.subscribe((params:{})=>{
      this.rentCars = this.rentCarService.search(params);
    });
  }

  ngOnDestroy(){
    this.paramsSubscription.unsubscribe();
  }

}
