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
  toBePremium:string[]=[];
  selected:string[]=[];
  firstRows = new Array();
  businessRows = new Array();
  economyRows = new Array();
  settingConfig=false;
  done=false;
  hidden=true;

  constructor(private route:ActivatedRoute) { }



  ngOnInit() {

    this.toBePremium=[];

    if(this.route.snapshot.routeConfig.path.includes('add-plane')){
      this.settingConfig=true;
      this.hidden=false;
    }

    this.firstRows=this.getSeatsPerSegment(0,'First class');

    if(this.firstRows!==undefined){
      this.businessRows=this.getSeatsPerSegment(this.firstRows.length, 'Business class');
    }
    else{
      this.businessRows=this.getSeatsPerSegment(0, 'Business class');
    }

    if(this.businessRows!==undefined){
      if(this.firstRows!==undefined){
        this.economyRows=this.getSeatsPerSegment(this.firstRows.length + this.businessRows.length, 'Economy class');
      }
      else{
        this.economyRows=this.getSeatsPerSegment(this.businessRows.length, 'Economy class');
      }
    }
    else{
      if(this.firstRows!==undefined){
        this.economyRows=this.getSeatsPerSegment(this.firstRows.length, 'Economy class');
      }
      else{
        this.economyRows=this.getSeatsPerSegment(0, 'Economy class');
      }
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
        if(segment!==undefined){
          let segmentInfo = segment.value;
          console.log(segmentInfo);
          if(segmentInfo !== undefined){
            for(let row = 0 ; row<segmentInfo.rows; row++){
              for(let seats = 0; seats<segmentInfo.columns; seats++){
                seatChar = String.fromCharCode(65 + seats)
                seatsInARow.push((start+row + 1).toString() + seatChar);
              }
              rows.push(seatsInARow);
              seatsInARow = new Array();
            }
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

  seatActionConfig(seat){
    if(this.toBePremium.indexOf(seat)===-1){
      this.toBePremium.push(seat);
    }
    else{
      var index=this.toBePremium.indexOf(seat);
      this.toBePremium.splice(index, 1);
    }
  }
}
