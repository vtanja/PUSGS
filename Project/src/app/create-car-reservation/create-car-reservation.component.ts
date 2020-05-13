import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Flight } from '../models/flight.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AirlineService } from '../services/airline.service';
import { ActivatedRoute } from '@angular/router';
import { Car } from '../models/Car.model';
import { RentCarService } from '../services/rent-a-car.service';
import { startWith, map } from 'rxjs/operators';
import { NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';

export const _filter = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();

  return opt.filter(item => item.toLowerCase().indexOf(filterValue) === 0);
};
export interface LocationGroup {
  letter: string;
  names: string[];
}

@Component({
  selector: 'app-create-car-reservation',
  templateUrl: './create-car-reservation.component.html',
  styleUrls: ['./create-car-reservation.component.css']
})
export class CreateCarReservationComponent implements OnInit {
  flight:Flight;
  car:Car;
  reservationForm:FormGroup;

  locationGroups: LocationGroup[] =[
    {
      letter: 'B',
      names: ['Belgrade, Serbia','Budapest, Hungary','Banja Luka, BiH']
  
    },
     {
      letter: 'D',
      names: ['Dubrovnik, Croatia']
    }, {
      letter: 'M',
      names: ['Mostar, BiH','Munich, Germany']
    }, {
      letter: 'N',
      names: ['Novi Sad, Serbia','Novo Mesto, Slovenia']
    }, {
      letter: 'T',
      names: ['Trebinje, BiH']
    }];
    
    dropOffLocationOptions: Observable<LocationGroup[]>;
  

  constructor(private airlineService:AirlineService, private route:ActivatedRoute, private rentCarService:RentCarService, private config: NgbDatepickerConfig) { 
    const current = new Date();
      config.minDate = { year: current.getFullYear(), month:
      current.getMonth() + 1, day: current.getDate() };
      config.outsideDays = 'hidden';
  }

  ngOnInit(): void {
    this.flight = this.airlineService.getFlight(+this.route.snapshot.params['id']);
    const carId = +this.route.snapshot.params['carid'];
    console.log(carId);
    this.car = this.rentCarService.getCarFromId(carId);
      this.reservationForm = new FormGroup({
          'dropOffDate':new FormControl(new Date().toString(), Validators.required),
          'dropOffLocation':new FormControl('', Validators.required)
      });

      this.dropOffLocationOptions = this.reservationForm.get('dropOffLocation')!.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterGroup(value))
      );

  }

  private _filterGroup(value: string): LocationGroup[] {
    if (value) {
      return this.locationGroups
        .map(group => ({letter: group.letter, names: _filter(group.names, value)}))
        .filter(group => group.names.length > 0);
    }

    return this.locationGroups;
  }

  getDaysBetween(start:string,end:string):number{

    const ONE_DAY = 1000 * 60 * 60 * 24;

    var startParts = start.split('-');
    var endParts = end.split('-');

    var date1 = new Date(+startParts[2],+startParts[1]-1,+startParts[0]);
    var date2 = new Date(+endParts[2],+endParts[1]-1,+endParts[0]);

    const diffDays = Math.round(Math.abs((+date1 - +date2) / ONE_DAY));
    return diffDays;
  }

  createReservation(){
    //kreiranje rezervacije
    
  }
}
