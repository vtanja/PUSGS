import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Plane } from 'src/app/models/plane';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { AirlineAdministratorService } from 'src/app/services/airline-administrator.service';
import { Router } from '@angular/router';
import { startWith, map } from 'rxjs/operators';
import { MatChipInputEvent } from '@angular/material/chips';
import Swal from 'sweetalert2';
import { PlaneLayoutComponent } from 'src/app/components/plane-layout/plane-layout.component';
import { PlaneService } from 'src/app/services/plane.service';
import { Segment } from 'src/app/models/segment';

@Component({
  selector: 'app-add-plane',
  templateUrl: './add-plane.component.html',
  styleUrls: ['./add-plane.component.css']
})
export class AddPlaneComponent implements OnInit {

  nameGroup:FormGroup;
  firstFormGroup:FormGroup;
  secondFormGroup:FormGroup;
  thirdFormGroup:FormGroup;
  fourthFormGroup:FormGroup;

  businessClass:FormGroup;
  firstClass:FormGroup;
  premium:FormGroup;
  economy:FormGroup;

  premiumEconomySeats:string[]=[];

  segments:string[]=[];
  chosenSegments:string[]=[];
  filteredSegments:Observable<string[]>;

  plane:Plane;
  show=false;

  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  segmentCtrl = new FormControl();

  @ViewChild('segmentInput') segmentInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  @ViewChild('toBePremium') toBePremium:PlaneLayoutComponent;

  constructor(private planeService:PlaneService, private router:Router) {

    this.setSegments();

    this.filteredSegments = this.segmentCtrl.valueChanges.pipe(
      startWith(null),
      map((segment: string | null) => segment ? this._filter(this.segments, segment) : this.segments.slice()));
  }

  ngOnInit(): void {
    console.log('Add plane preumium:');
    console.log(this.toBePremium);
    this.firstClass=new FormGroup({
      'rowsInput':new FormControl('', Validators.required),
      'columnsInput':new FormControl('', Validators.required)
    });

    this.businessClass=new FormGroup({
      'rowsInput':new FormControl('', Validators.required),
      'columnsInput':new FormControl('', Validators.required)
    });

    this.economy=new FormGroup({
      'rowsInput':new FormControl('', Validators.required),
      'columnsInput':new FormControl('', Validators.required)
    });

    this.premium=new FormGroup({
      'rowsInput':new FormControl('', Validators.required),
      'columnsInput':new FormControl('', Validators.required)
    });

    this.nameGroup=new FormGroup({
      'nameInput':new FormControl('', Validators.required)
    });
  }

  setSegments(){
    this.segments.push("First class");
    this.segments.push("Business class");
    this.segments.push("Premium economy");
    this.segments.push("Economy class");
  }

  private _filter = (opt: string[], value: string): string[] => {
    const filterValue = value.toLowerCase();

    return opt.filter(item => item.toLowerCase().indexOf(filterValue) === 0 );
  };

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.segmentCtrl.setValue(null);
  }


  remove(segment: string): void {
    const index = this.chosenSegments.indexOf(segment);

    if (index >= 0) {
      this.chosenSegments.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    if(!this.chosenSegments.includes(event.option.viewValue)){
      this.chosenSegments.push(event.option.viewValue);
    }
    console.log(this.chosenSegments)
    this.segmentInput.nativeElement.value = '';
    this.segmentCtrl.setValue(null);
  }

  setConfig(){
    let totalRows:number =0;
    let totalColumns:number=0;

    this.plane = new Plane(this.nameGroup.get('nameInput').value, [], 0);
    

    if(this.chosenSegments.includes('First class')){
      let rows = +this.firstClass.get('rowsInput').value;
      let columns = +this.firstClass.get('columnsInput').value;
      let segment = new Segment('First class', rows, columns);
      this.plane.segments.push(segment);
    }

    if(this.chosenSegments.includes('Business class')){
      let rows = +this.businessClass.get('rowsInput').value;
      let columns = +this.businessClass.get('columnsInput').value;
      let segment = new Segment('Business class', rows, columns);
      this.plane.segments.push(segment);
    }

    if(this.chosenSegments.includes('Premium economy')){
      let rows = +this.premium.get('rowsInput').value;
      let columns = +this.premium.get('columnsInput').value;
      let segment = new Segment('Premium economy', rows, columns);
      this.plane.segments.push(segment);
    }

    if(this.chosenSegments.includes('Economy class')){
      let rows = +this.economy.get('rowsInput').value;
      let columns = +this.economy.get('columnsInput').value;
      let segment = new Segment('Economy class', rows, columns);
      this.plane.segments.push(segment);
    }

    console.log(this.plane);
    this.show=true;
  }

  getSeats(startRow:number, rows:number, columns:number):string[]{
    var seatChar='';
    var retVal:string[]=[];
    for(let row = startRow ; row< rows; row++){
      for(let seats = 0; seats<columns; seats++){
        seatChar = String.fromCharCode(65 + seats)
        retVal.push((row + 1).toString() + seatChar);
      }
    }
    return retVal;
  }

  confirm(){
    console.log(this.plane);
    this.planeService.addPlane(this.plane).subscribe((res:any)=>{
      Swal.fire({
        text: 'Plane successfully added!',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500,
      });
      this.router.navigate(['/planes']);
    }, (err)=>{
      console.log(err);
      Swal.fire({
        text: err.error.message,
        icon: 'error',
        showConfirmButton: true,
      });
    });
    
  }


}
