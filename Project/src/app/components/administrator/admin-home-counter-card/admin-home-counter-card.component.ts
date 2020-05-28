import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-admin-home-counter-card',
  templateUrl: './admin-home-counter-card.component.html',
  styleUrls: ['./admin-home-counter-card.component.css']
})
export class AdminHomeCounterCardComponent implements OnInit {

  @Input('image') image:string;
  @Input('countTo') counter:number;
  @Input('text') text:string;

  constructor() { }

  ngOnInit(): void {
  }





}
