import { Component, OnInit } from '@angular/core';
import { FlightReservationService } from 'src/app/services/flight-reservation.service';
import { Router } from '@angular/router';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { Label, Color } from 'ng2-charts';
import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';
import { Subscription } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-airline-chart-bar',
  templateUrl: './airline-chart-bar.component.html',
  styleUrls: ['./airline-chart-bar.component.css']
})
export class AirlineChartBarComponent implements OnInit {
  barChartOptions: ChartOptions = {
    responsive: true,
    title: {
      text: '',
      display: true,
      fontSize:12,
    },
    tooltips:{
      backgroundColor:'#eea136',
      titleAlign:'center'
    },
    legend:{
      position:'bottom'
    },
    scales: {
      xAxes: [{
          gridLines: {
              drawOnChartArea: false
          }
      }],
      yAxes: [{
          gridLines: {
              drawOnChartArea: false
          },
          ticks: {
            beginAtZero: true
          }
      }],

  }
  };
  barChartLabels: Label[] ;
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  isSpinning:boolean = false;
  mySubscription:Subscription;
  monthlyIncomesSubscription:Subscription;
  annualIncomesSubscription:Subscription;

  barChartData: ChartDataSets[] = [
    { data: [], label: 'Flight Reservations', backgroundColor:'#31124b'
    ,hoverBackgroundColor:'#7d589b'}
  ];


  public lineChartColors: Color[] = [
    {
      borderColor: '#31124b',
      backgroundColor: '#eea136',
    },
  ];


  constructor(private flightReservationService:FlightReservationService,
    private spinner: NgxSpinnerService,
    private router:Router,
    private calendar:NgbCalendar) { }

ngOnInit(): void {

    var today = this.calendar.getToday();

    if(this.router.url.includes('airline-monthly-incomes')){
      this.updateChart('incomes');
      this.getMonthlyIncomes(today.month+':'+today.year);
    }else if(this.router.url.includes('airline-annual-incomes')){
      this.updateChart('incomes');
      this.getAnnualIncomes(today.year);
    }else{
    this.getDailyReport();
    }

    this.mySubscription = this.flightReservationService.airlinebarChartSubject.subscribe((data)=>{
      this.updateChart('reservations');

      if(data==="daily"){
        this.getDailyReport();
      }else if(data==="weekly"){
        this.getWeeklyReport();
      }else if(data==="monthly"){
        this.getMonthlyReport();
      }
      else if(data === "average"){
        this.getAverageRating();
      }
    });

    this.monthlyIncomesSubscription = this.flightReservationService.monthlyIncomesSubject.subscribe((data)=>
      {
        this.updateChart('incomes');
        this.getMonthlyIncomes(data);
      });

      this.annualIncomesSubscription = this.flightReservationService.annualIncomesSubject.subscribe((data)=>
      {
        this.updateChart('incomes');
        this.getAnnualIncomes(data);
      });
}
  getAverageRating() {
    this.showSpinner();
  this.flightReservationService.getAverageRating().subscribe(
    (res:any)=>{
        this.hideSpinner();
        this.barChartLabels = res.labels;
        this.barChartData[0].data = res.data;
        this.barChartOptions.title.text=res.title;
  },
  (err)=>{
    this.hideSpinner();
    console.log(err);
  }
  )
  }

getMonthlyIncomes(data){
  this.showSpinner();
  this.flightReservationService.getMonthlyIncomes(data).subscribe(
    (res:any)=>{
      this.hideSpinner();
      this.barChartLabels = res.labels;
      this.barChartData[0].data = res.data;
      this.barChartOptions.title.text=res.title;
    },
    (err)=>{
      this.hideSpinner();
      console.log(err);
    }
  )
}

getAnnualIncomes(data){
  this.showSpinner();
  this.flightReservationService.getAnnualIncomes(data).subscribe(
    (res:any)=>{
      this.hideSpinner();
      this.barChartLabels = res.labels;
      this.barChartData[0].data = res.data;
      this.barChartOptions.title.text=res.title;
    },
    (err)=>{
      this.hideSpinner();
      console.log(err);
    }
  )
}

getDailyReport(){
  this.showSpinner();
  this.flightReservationService.getDailyReport().subscribe(
    (res:any)=>{
        this.hideSpinner();
        this.barChartLabels = res.labels;
        this.barChartData[0].data = res.data;
        this.barChartOptions.title.text=res.title;
  },
  (err)=>{
    this.hideSpinner();
    console.log(err);
  }
  )
}

getWeeklyReport(){
  this.showSpinner();
  this.flightReservationService.getWeeklyReport().subscribe(
  (res:any)=>{
  this.hideSpinner();
    this.barChartLabels = res.labels;
    this.barChartData[0].data = res.data;
    this.barChartOptions.title.text=res.title;
  },
  (err)=>{
    this.hideSpinner();
    console.log(err);
  }
  )
}

getMonthlyReport(){
  this.showSpinner();
  this.flightReservationService.getMonthlyReport().subscribe(
      (res:any)=>{
      this.hideSpinner();
      this.barChartLabels = res.labels;
      this.barChartData[0].data = res.data;
      this.barChartOptions.title.text=res.title;
  },
  (err)=>{
      this.hideSpinner();
      console.log(err);
  }
  )
}




updateChart(data:string){
if(data==='incomes'){
this.barChartType='line';
this.barChartData[0].label = 'Airline incomes';
}else{
this.barChartType='bar';
this.barChartData[0].label = 'Flight reservations';
}
}

showSpinner(){
this.isSpinning = true;
this.spinner.show();
}

hideSpinner(){
this.spinner.hide();
this.isSpinning = false;
}

ngOnDestroy(){
this.mySubscription.unsubscribe();
this.annualIncomesSubscription.unsubscribe();
this.monthlyIncomesSubscription.unsubscribe();
}

}
