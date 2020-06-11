import { Component, OnInit } from '@angular/core';
import { CarReservationsService } from 'src/app/services/car-reservations.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private carReservationService:CarReservationsService,private router:Router) { }

  activeLink:string = "daily";

  ngOnInit(): void {
  }

  onClick(data:string){
    this.activeLink = data;
    this.carReservationService.barChartSubject.next(data);
  }

  onMonthIncomesClick(){
    this.activeLink = 'monthlyIncomes';
    this.router.navigateByUrl('/rent-car-admin-home/monthly-incomes');
  }

  onAnnualIncomesClick(){
    this.activeLink = 'annualIncomes';
    this.router.navigateByUrl('/rent-car-admin-home/annual-incomes');
  }

  isActive(str:string){
    if(str===this.activeLink)
      return true;
    return false;
  }
}
