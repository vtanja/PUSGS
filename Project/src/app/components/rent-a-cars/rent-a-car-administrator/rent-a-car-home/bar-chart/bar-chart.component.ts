import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, Color } from 'ng2-charts';
import { CarReservationsService } from 'src/app/services/car-reservations.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit,OnDestroy {



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
    { data: [], label: 'Car Reservations', backgroundColor:'#31124b'
    ,hoverBackgroundColor:'#7d589b'}
  ];


  public lineChartColors: Color[] = [
    {
      borderColor: '#31124b',
      backgroundColor: '#eea136',
    },
  ];


  constructor(private carReservationService:CarReservationsService,
              private spinner: NgxSpinnerService,
              private router:Router,
              private calendar:NgbCalendar) { }

  ngOnInit(): void {

    var today = this.calendar.getToday();

    if(this.router.url.includes('monthly-incomes')){
      this.updateChart('incomes');
      this.getMonthlyIncomes(today.month+':'+today.year);
    }else if(this.router.url.includes('annual-incomes')){
      this.updateChart('incomes');
      this.getAnnualIncomes(today.year);
    }else{
    this.getDailyReport();
    }

    this.mySubscription = this.carReservationService.barChartSubject.subscribe((data)=>{
      this.updateChart('reservations');

      if(data==="daily"){
        this.getDailyReport();
      }else if(data==="weekly"){
        this.getWeeklyReport();
      }else if(data==="monthly"){
        this.getMonthlyReport();
      }
    });

      this.monthlyIncomesSubscription = this.carReservationService.monthlyIncomesSubject.subscribe((data)=>
      {
        this.updateChart('incomes');
        this.getMonthlyIncomes(data);
      });

      this.annualIncomesSubscription = this.carReservationService.annualIncomesSubject.subscribe((data)=>
      {
        this.updateChart('incomes');
        this.getAnnualIncomes(data);
      });

  }

  getDailyReport(){
    this.showSpinner();
    this.carReservationService.getDailyReport().subscribe(
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
    this.carReservationService.getWeeklyReport().subscribe(
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
    this.carReservationService.getMonthlyReport().subscribe(
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
    this.carReservationService.getMonthlyIncomes(data).subscribe(
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
    this.carReservationService.getAnnualIncomes(data).subscribe(
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
    this.barChartData[0].label = 'CompanyIncomes';
    }else{
      this.barChartType='bar';
    this.barChartData[0].label = 'CarReservations';
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
    this.monthlyIncomesSubscription.unsubscribe();
    this.annualIncomesSubscription.unsubscribe();
  }
}
