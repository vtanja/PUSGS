import { Component, OnInit, Input } from '@angular/core';
import { RentCar } from 'src/app/models/rent-a-car.model';

@Component({
  selector: 'app-car-profile-offices',
  templateUrl: './car-profile-offices.component.html',
  styleUrls: ['./car-profile-offices.component.css']
})
export class CarProfileOfficesComponent implements OnInit {

  @Input('carCompany') carCompany:RentCar;
  destinations:number;
  isCollapsed:boolean[];
  lastCollapse:number=-1;
  offices:any;

  constructor() { }

  ngOnInit(): void {

    this.isCollapsed = new Array<boolean>();

    console.log(this.offices)

    var j=0;
    for( var i in this.carCompany.offices ){

      this.isCollapsed[j]=true;
      j++;
    }

  }

  onClick(id:number):void{

    if(this.lastCollapse!=-1 && this.lastCollapse!=id){
      this.isCollapsed[this.lastCollapse]=true;
    }

      this.isCollapsed[id]=!this.isCollapsed[id];
      this.lastCollapse=id;
  }

}
