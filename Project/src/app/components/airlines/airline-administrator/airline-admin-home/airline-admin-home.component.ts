import { Component, OnInit } from '@angular/core';
import { AirlineService } from 'src/app/services/airline.service';

@Component({
  selector: 'app-airline-admin-home',
  templateUrl: './airline-admin-home.component.html',
  styleUrls: ['./airline-admin-home.component.css']
})
export class AirlineAdminHomeComponent implements OnInit {

  constructor(private airlineService:AirlineService) { }

    airlineRate:number;
    ngOnInit(): void {
      this.airlineService.getCompanyRate().subscribe(
        (res:any)=>{
          console.log(res);
          this.airlineRate=res;
          console.log(this.airlineRate);
        },
        (err)=>{
          console.log(err);
        }
      )
    }
  }

