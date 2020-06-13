import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

 import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import * as _moment from 'moment';
import {default as _rollupMoment, Moment} from 'moment';
import { MatDatepicker } from '@angular/material/datepicker';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { FlightReservationService } from 'src/app/services/flight-reservation.service';

const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-airline-monthly-incomes',
  templateUrl: './airline-monthly-incomes.component.html',
  styleUrls: ['./airline-monthly-incomes.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
})
export class AirlineMonthlyIncomesComponent implements OnInit {

  date = new FormControl(moment());
  stringYear:string ="";
  stringMonth:string ="";
  
  constructor(private flightReservationService:FlightReservationService,private calendar:NgbCalendar) { }

  ngOnInit(): void {
  }

  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.date.value;
    this.stringYear = normalizedYear.year().toString();
    ctrlValue.year(normalizedYear.year());
    this.date.setValue(ctrlValue);
  }


  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value;
    ctrlValue.month(normalizedMonth.month());
    this.date.setValue(ctrlValue);
    datepicker.close();
    this.stringMonth = normalizedMonth.month().toString();
    this.flightReservationService.monthlyIncomesSubject.next(this.stringMonth+':'+this.stringYear);
  }
}
