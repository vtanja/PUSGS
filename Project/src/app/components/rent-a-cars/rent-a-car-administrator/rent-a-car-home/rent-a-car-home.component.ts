import { Component, OnInit } from '@angular/core';
import { CarReservationsService } from 'src/app/services/car-reservations.service';
import { RentCarService } from 'src/app/services/rent-a-car.service';

@Component({
  selector: 'app-rent-a-car-home',
  templateUrl: './rent-a-car-home.component.html',
  styleUrls: ['./rent-a-car-home.component.css']
})
export class RentACarHomeComponent implements OnInit {

  constructor(private rentCarService:RentCarService) { }

  carRate:number;
  ngOnInit(): void {
    this.rentCarService.getCompanyRate().subscribe(
      (res:any)=>{
        console.log(res);
        this.carRate=res;
        console.log(this.carRate);
      },
      (err)=>{
        console.log(err);
      }
    )
  }

}
