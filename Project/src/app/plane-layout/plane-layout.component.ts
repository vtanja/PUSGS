import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SeatsLayout } from '../models/seats-layout';

@Component({
  selector: 'app-plane-layout',
  templateUrl: './plane-layout.component.html',
  styleUrls: ['./plane-layout.component.css']
})
export class PlaneLayoutComponent implements OnInit {
  @Input() seatsLayout:SeatsLayout;
  @Input() toBeAdded: string[];
  rows = new Array();

  constructor() { }
  
  
  
  ngOnInit() {
  
    var rows=new Array()
    var seatsInARow= new Array()
    var seatChar;
    if (this.seatsLayout != undefined && this.seatsLayout.hasOwnProperty('totalRows')){
      if(this.seatsLayout.seatNaming='rowType'){
        for(let row = 0 ; row<this.seatsLayout.totalRows; row++){
          for(let seats = 0; seats<this.seatsLayout.seatsPerRow; seats++){
            seatChar = String.fromCharCode(65 + seats)
            seatsInARow.push((row + 1).toString() + seatChar);
          }
          rows.push(seatsInARow);
          seatsInARow = new Array();
        }
      }
    }
    this.rows = rows
  
  }
  
  

  seatAction(seat){
    if(this.toBeAdded.indexOf(seat)===-1){
      this.toBeAdded.push(seat);
    }
    else{
      var index=this.toBeAdded.indexOf(seat);
      this.toBeAdded.splice(index, 1);
    }
  }
}
