import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {

  barChartOptions: ChartOptions = {
    responsive: true,
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
          }
      }],

  }
  };
  barChartLabels: Label[] = ['Audi A3', 'Peugeot 207', 'Nissan Y7', 'Golf 7', 'Audi A6','Audi A3', 'Peugeot 207', 'Nissan Y7', 'Golf 7', 'Audi A6','dasdasd'];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];


  barChartData: ChartDataSets[] = [
    { data: [45, 37, 60, 70, 46,11,12,13,14,13,13], label: 'Car Reservations', backgroundColor:'#31124b'
    ,hoverBackgroundColor:'#7d589b'}
  ];



  constructor() { }

  ngOnInit(): void {
  }


}
