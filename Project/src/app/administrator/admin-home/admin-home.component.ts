import { Component, OnInit, AfterViewInit, ElementRef} from '@angular/core';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit,AfterViewInit {

  firstImage:string = "../../assets/images/adminHome/car-reservation.png";
  secondImage:string = "../../assets/images/adminHome/boarding-pass.png";
  thirdImage:string = "../../assets/images/adminHome/car.png";
  fourthImage:string = "../../assets/images/adminHome/airline.png";

  firstCounter:number=100;
  secondCounter:number=215;
  thirdCounter:number=178;
  fourthCounter:number=395;

  firstString:string="Car reservations";
  secondString:string="Flight reservations";
  thirdString:string="Rent car companies";
  fourthString:string="Airline companies";

  constructor(private elRef: ElementRef) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {

  }

}
