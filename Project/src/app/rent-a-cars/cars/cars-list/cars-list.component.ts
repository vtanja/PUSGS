import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/models/Car.model';
import { RentCarService } from '../../rent-a-car.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-cars-list',
  templateUrl: './cars-list.component.html',
  styleUrls: ['./cars-list.component.css']
})
export class CarsListComponent implements OnInit {

  cars:Array<Car> = new Array<Car>();
  params:{};

  constructor(private rentCarService:RentCarService,
              private activeRoute:ActivatedRoute) { }

  ngOnInit(): void {

    this.activeRoute.queryParams.subscribe((params:Params)=>
      this.params = this.activeRoute.snapshot.queryParams );
      this.cars=this.rentCarService.getCars(this.params);
      console.log(this.cars);
  }

}
