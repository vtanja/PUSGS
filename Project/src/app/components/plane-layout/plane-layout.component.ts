import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Plane } from '../../models/plane';

@Component({
  selector: 'app-plane-layout',
  templateUrl: './plane-layout.component.html',
  styleUrls: ['./plane-layout.component.css']
})
export class PlaneLayoutComponent implements OnInit {
  @Input() plane:Plane;
  @Input() toBeAdded: string[]=[];
  selected:string[]=[];
  firstRows = new Array();
  businessRows = new Array();
  economyRows = new Array();
  premiumRows = [];
  settingConfig=false;
  done=false;
  hidden=true;

  constructor(private route:ActivatedRoute) { }



  ngOnInit() {


    if(this.route.snapshot.routeConfig.path.includes('add-plane')){
      this.settingConfig=true;
      this.hidden=false;
    }
    if(this.route.snapshot.routeConfig.path.includes('edit-plane')){
      this.settingConfig=true;
    }

    this.firstRows=this.getSeatsPerSegment(0,'First class');

    this.findBusinessStart();

    this.findEconomyPremiumStart();

    this.findEconomyStart();

    console.log(this.firstRows);
    console.log(this.businessRows);
    console.log(this.premiumRows);
    console.log(this.economyRows);
  }

  private findBusinessStart() {
    if (this.firstRows !== undefined) {
      this.businessRows = this.getSeatsPerSegment(this.firstRows.length, 'Business class');
    }
    else {
      this.businessRows = this.getSeatsPerSegment(0, 'Business class');
    }
  }

  private findEconomyPremiumStart() {
    if (this.businessRows !== undefined) {
      if (this.firstRows !== undefined) {
        this.premiumRows = this.getSeatsPerSegment(this.firstRows.length + this.businessRows.length, 'Premium economy');
      }
      else {
        this.premiumRows = this.getSeatsPerSegment(this.businessRows.length, 'Premium economy');
      }
    }
    else {
      if (this.firstRows !== undefined) {
        this.premiumRows = this.getSeatsPerSegment(this.firstRows.length, 'Premium economy');
      }
      else {
        this.premiumRows = this.getSeatsPerSegment(0, 'Premium economym');
      }
    }
  }

  private findEconomyStart() {
    if (this.businessRows === undefined && this.firstRows === undefined && this.premiumRows === undefined) {
      this.economyRows = this.getSeatsPerSegment(0, 'Economy class');
    }
    else if (this.businessRows !== undefined && this.firstRows === undefined && this.premiumRows === undefined) {
      this.economyRows = this.getSeatsPerSegment(this.businessRows.length, 'Economy class');
    }
    else if (this.businessRows === undefined && this.firstRows !== undefined && this.premiumRows === undefined) {
      this.economyRows = this.getSeatsPerSegment(this.firstRows.length, 'Economy class');
    }
    else if (this.businessRows === undefined && this.firstRows === undefined && this.premiumRows !== undefined) {
      this.economyRows = this.getSeatsPerSegment(this.premiumRows.length, 'Economy class');
    }
    else if (this.businessRows !== undefined && this.firstRows !== undefined && this.premiumRows === undefined) {
      this.economyRows = this.getSeatsPerSegment(this.firstRows.length + this.businessRows.length, 'Economy class');
    }
    else if (this.businessRows !== undefined && this.firstRows === undefined && this.premiumRows !== undefined) {
      this.economyRows = this.getSeatsPerSegment(this.premiumRows.length + this.businessRows.length, 'Economy class');
    }
    else if (this.businessRows === undefined && this.firstRows !== undefined && this.premiumRows !== undefined) {
      this.economyRows = this.getSeatsPerSegment(this.premiumRows.length + this.firstRows.length, 'Economy class');
    }
    else if (this.businessRows !== undefined && this.firstRows !== undefined && this.premiumRows !== undefined) {
      this.economyRows = this.getSeatsPerSegment(this.premiumRows.length = this.businessRows.length + this.firstRows.length, 'Economy class');
    }
  }

  getSeatsPerSegment(start:number, segmentname:string){
    var rows=new Array()
    var seatsInARow= new Array()
    var seatChar;

    console.log('start');
    console.log(start);

    if (this.plane != undefined){
        let segment = this.plane.segments.find(s=>s.name===segmentname);
        console.log(segment);
        if(segment!==undefined){
            for(let row = 0 ; row<segment.rows; row++){
              for(let seats = 0; seats<segment.columns; seats++){
                seatChar = String.fromCharCode(65 + seats)
                seatsInARow.push((start+row + 1).toString() + seatChar);
              }
              rows.push(seatsInARow);
              seatsInARow = new Array();
            }
        }
      }
      console.log(rows);
    return rows;
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
