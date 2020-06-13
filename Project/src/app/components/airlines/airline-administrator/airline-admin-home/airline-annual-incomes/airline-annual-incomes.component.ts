import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

 import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import * as _moment from 'moment';
import {default as _rollupMoment, Moment} from 'moment';
import { MatDatepicker } from '@angular/material/datepicker';
import { CarReservationsService } from 'src/app/services/car-reservations.service';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { FlightReservationService } from 'src/app/services/flight-reservation.service';


const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY',
  },
  display: {
    dateInput: 'YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-airline-annual-incomes',
  templateUrl: './airline-annual-incomes.component.html',
  styleUrls: ['./airline-annual-incomes.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
})
export class AirlineAnnualIncomesComponent implements OnInit {

  date = new FormControl(moment());

  constructor(private flightReservationService:FlightReservationService,private calendar:NgbCalendar) { }

  ngOnInit(): void {}

  chosenYearHandler(normalizedYear: Moment,datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value;
    ctrlValue.year(normalizedYear.year());
    this.date.setValue(ctrlValue);
    datepicker.close();
    this.flightReservationService.annualIncomesSubject.next(normalizedYear.year());
  }


}
