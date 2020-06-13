import { Component, OnInit } from '@angular/core';
import { FlightReservationService } from 'src/app/services/flight-reservation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-airline-navbar',
  templateUrl: './airline-navbar.component.html',
  styleUrls: ['./airline-navbar.component.css']
})
export class AirlineNavbarComponent implements OnInit {

  constructor(private flightReservationService:FlightReservationService, private router:Router) { }

  activeLink:string = "daily";

  ngOnInit(): void {
  }



  onClick(data:string){
    this.activeLink = data;
    this.flightReservationService.airlinebarChartSubject.next(data);
  }


  onMonthIncomesClick(){
    this.activeLink = 'monthlyIncomes';
    this.router.navigateByUrl('/airline-admin-home/airline-monthly-incomes');
  }

  onAnnualIncomesClick(){
    this.activeLink = 'annualIncomes';
    this.router.navigateByUrl('/airline-admin-home/airline-annual-incomes');
  }

  isActive(str:string){
    if(str===this.activeLink)
      return true;
    return false;
  }
}
