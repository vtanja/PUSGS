import { Component, OnInit } from '@angular/core';
import { Airline } from 'src/app/models/airline.model';
import { AirlineService } from '../../services/airline.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-airlines-list',
  templateUrl: './airlines-list.component.html',
  styleUrls: ['./airlines-list.component.css']
})
export class AirlinesListComponent implements OnInit {
  airlines:Airline[]=[];
  sortCriteria:string='';
  
  isSpining:boolean = true;

  constructor(private airlineService:AirlineService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.airlineService.getAirlines().subscribe(
      (res)=>{
        console.log(res);
        this.airlines = res;
        this.spinner.hide();
        this.isSpining = false;
      },
      (err)=>{
        this.spinner.hide();
        this.isSpining = true;
      }
    );
  }


}
