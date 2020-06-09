import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Flight } from 'src/app/models/flight.model';
import { RoundFlight } from 'src/app/models/round-flight.model';
import { ActivatedRoute } from '@angular/router';
import { AirlineService } from 'src/app/services/airline.service';
@Component({
  selector: 'app-round-flight-item',
  templateUrl: './round-flight-item.component.html',
  styleUrls: ['./round-flight-item.component.css']
})
export class RoundFlightItemComponent implements OnInit,AfterViewInit {
  price:number;
  hours1:number;
  hours2:number;
  minutes1:number;
  minutes2:number;
  private readonly image='../../../../../assets/images/airlines/';
  imgToDisplay1:string;
  imgToDisplay2:string;
  @Input() roundFlight:RoundFlight;
  constructor(private route:ActivatedRoute, private airlineService:AirlineService) { }

  ngAfterViewInit(): void {
    this.hours1 = Math.floor(this.roundFlight.toFlight.duration/60);
    this.minutes1 = this.roundFlight.toFlight.duration%60;

    this.hours2 = Math.floor(this.roundFlight.backFlight.duration/60);
    this.minutes2 = this.roundFlight.backFlight.duration%60;

    var klasa = this.route.snapshot.queryParams['class'];
      let price1 = this.roundFlight.toFlight.segmentPrices.find(x=>x.segment.name === klasa).price;
      let price2 = this.roundFlight.backFlight.segmentPrices.find(x=>x.segment.name === klasa).price;
      this.price = price1+price2;

      this.airlineService.getAirline(this.roundFlight.toFlight.plane.airlineId).subscribe((res:any)=>{
        this.imgToDisplay1 = this.image+res.image;
      })

      this.airlineService.getAirline(this.roundFlight.backFlight.plane.airlineId).subscribe((res:any)=>{
        this.imgToDisplay2 = this.image+res.image;
      })
  }

  ngOnInit(): void {
  }

}
