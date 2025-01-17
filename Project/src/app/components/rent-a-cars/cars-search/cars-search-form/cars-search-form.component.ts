import { Component, OnInit, Input, ɵConsole, OnDestroy } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  ValidationErrors,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {
  NgbDateStruct,
  NgbDate,
  NgbDatepickerConfig,
  NgbCalendar,
} from '@ng-bootstrap/ng-bootstrap';

import { RentCarService } from '../../../../services/rent-a-car.service';
import { Observable } from 'rxjs/internal/Observable';
import { startWith, map } from 'rxjs/operators';
import { AppDataService } from 'src/app/services/app-data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cars-search-form',
  templateUrl: './cars-search-form.component.html',
  styleUrls: ['./cars-search-form.component.css'],
})
export class CarsSearchFormComponent implements OnInit, OnDestroy {
  options: string[] = ['Novi Sad,Serbia', 'Belgrade,Serbia'];

  pickUpLocationOptions: Observable<string[]>;
  dropOffLocationOptions: Observable<string[]>;

  times: Array<string>;
  cars: Array<string>;

  searchForm: FormGroup;
  searched: boolean;

  addressesSubscription: Subscription = new Subscription();

  @Input('companyID') companyID: number;

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private rentCarsService: RentCarService,
    private config: NgbDatepickerConfig,
    private calendar: NgbCalendar,
    private appDataService: AppDataService
  ) {
    const current = new Date();
    config.minDate = {
      year: current.getFullYear(),
      month: current.getMonth() + 1,
      day: current.getDate(),
    };
    config.outsideDays = 'hidden';
  }

  ngOnInit(): void {
    let params = this.activeRoute.snapshot.queryParams;

    let pickUpDate;
    let dropOffDate;

    if (
      params['pickUpDate'] != undefined &&
      params['dropOffDate'] != undefined
    ) {
      const partsPickUp = params['pickUpDate'].split('-');
      const year = parseInt(partsPickUp[2]);
      const month = parseInt(partsPickUp[1]);
      const day = parseInt(partsPickUp[0]);
      pickUpDate = new NgbDate(year, month, day);

      const partsDropOff = params['dropOffDate'].split('-');
      const yearDropOff = parseInt(partsDropOff[2]);
      const monthDropOff = parseInt(partsDropOff[1]);
      const dayDropOff = parseInt(partsDropOff[0]);
      dropOffDate = new NgbDate(yearDropOff, monthDropOff, dayDropOff);

      this.searched = true;
    } else {
      pickUpDate = '';
      dropOffDate = '';
      this.searched = false;
    }

    const pickUpLocation =
      params['pickUpLocation'] != undefined ? params['pickUpLocation'] : '';
    const dropOffLocation =
      params['dropOffLocation'] != undefined ? params['dropOffLocation'] : '';
    const pickUpTime =
      params['pickUpTime'] != undefined ? params['pickUpTime'] : '';
    const dropOffTime =
      params['dropOffTime'] != undefined ? params['dropOffTime'] : '';
    const carBrand = params['carBrand'] != undefined ? params['carBrand'] : '';
    const passengers =
      params['passengers'] != undefined ? params['passengers'] : '';

    this.times = new Array<string>(
      '00:00',
      '01:00',
      '02:00',
      '03:00',
      '04:00',
      '05:00',
      '06:00',
      '07:00',
      '08:00',
      '09:00',
      '10:00',
      '11:00',
      '12:00',
      '13:00',
      '14:00',
      '15:00',
      '16:00',
      '17:00',
      '18:00',
      '19:00',
      '20:00',
      '21:00',
      '22:00',
      '23:00'
    );

    this.cars = new Array<string>(
      'BMW',
      'Golf',
      'Kia',
      'Ford',
      'Renault',
      'Toyota',
      'Peugeot',
      'Citroen',
      'Nissan',
      'Audi',
      'Yugo',
      'Mercedes'
    );

    this.searchForm = new FormGroup({
      location: new FormGroup({
        pickUpLocation: new FormControl(pickUpLocation, [Validators.required]),
        dropOffLocation: new FormControl(dropOffLocation, [
          Validators.required,
        ]),
      }),
      dateTimes: new FormGroup(
        {
          dates: new FormGroup(
            {
              pickUpDate: new FormControl(pickUpDate, Validators.required),
              dropOffDate: new FormControl(dropOffDate, Validators.required),
            },
            this.datesValid.bind(this)
          ),

          times: new FormGroup({
            pickUpTime: new FormControl(pickUpTime, Validators.required),
            dropOffTime: new FormControl(dropOffTime, Validators.required),
          }),
        },
        this.timesValid.bind(this)
      ),

      carBrand: new FormControl(carBrand),
      passengers: new FormControl(passengers),
    });

    this.pickUpLocationOptions = this.searchForm
      .get('location.pickUpLocation')!
      .valueChanges.pipe(
        startWith(''),
        map((value) => this._filter(value))
      );

    this.dropOffLocationOptions = this.searchForm
      .get('location.dropOffLocation')!
      .valueChanges.pipe(
        startWith(''),
        map((value) => this._filter(value))
      );

      this.options = this.appDataService.Locations===null?this.options:this.appDataService.Locations;

    this.addressesSubscription = this.appDataService.addressesSubject.subscribe(
      (data: string[]) => {
        this.options = this.appDataService.Locations;

      }
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  onFormSubmit() {
    const searchParams = {};
    this.searched = true;

    let pickUpDate = this.searchForm.get('dateTimes.dates.pickUpDate').value;
    let dropOffDate = this.searchForm.get('dateTimes.dates.dropOffDate').value;

    searchParams['pickUpDate'] =
      pickUpDate.day + '-' + pickUpDate.month + '-' + pickUpDate.year;
    searchParams['dropOffDate'] =
      dropOffDate.day + '-' + dropOffDate.month + '-' + dropOffDate.year;
    searchParams['pickUpTime'] = this.searchForm.get(
      'dateTimes.times.pickUpTime'
    ).value;
    searchParams['dropOffTime'] = this.searchForm.get(
      'dateTimes.times.dropOffTime'
    ).value;
    searchParams['pickUpLocation'] = this.searchForm.get(
      'location.pickUpLocation'
    ).value;
    searchParams['dropOffLocation'] = this.searchForm.get(
      'location.dropOffLocation'
    ).value;
    searchParams['carBrand'] = this.searchForm.get('carBrand').value;
    searchParams['passengers'] = +this.searchForm.get('passengers').value;

    if (this.companyID === undefined) {
      this.router.navigate(['/allCars'], { queryParams: searchParams });
    } else {
      searchParams['companyID'] = this.companyID;
      this.rentCarsService.searchCarsParamsSubject.next(searchParams);
    }
  }

  private requireMatch(control: FormControl): ValidationErrors | null {
    const selection: string = control.value;

    // if (selection != undefined && selection != '') {
    //   let group = this.locationGroups.find(
    //     (e) => e.letter === selection.substring(0, 1).toUpperCase()
    //   );
    if (control.value != undefined) {
      if (this.options.indexOf(selection) < 0) {
        return { requireMatch: true };
      }
    }
    return null;
  }

  private datesValid(group: FormGroup): { [s: string]: boolean } | null {
    if (group) {
      if (
        group.get('pickUpDate') != undefined &&
        group.get('dropOffDate') != undefined
      ) {
        if (
          group.get('pickUpDate').value != '' &&
          group.get('dropOffDate').value != ''
        ) {
          let pickUpForm = group.get('pickUpDate').value;
          let dropOffForm = group.get('dropOffDate').value;
          let pickUpDate = new NgbDate(
            pickUpForm.year,
            pickUpForm.month,
            pickUpForm.day
          );
          let dropoffDate = new NgbDate(
            dropOffForm.year,
            dropOffForm.month,
            dropOffForm.day
          );

          if (dropoffDate.after(pickUpDate) || dropoffDate.equals(pickUpDate)) {
            return null;
          }
        }
      }
      return { invalidDates: true };
    }
    return null;
  }

  private timesValid(group: FormGroup): { [s: string]: boolean } | null {
    if (group && this.searchForm) {
      if (
        group.get('times.pickUpTime') != undefined &&
        group.get('times.dropOffTime') != undefined
      ) {
        if (
          group.get('times.pickUpTime').value != '' &&
          group.get('times.dropOffTime').value != ''
        ) {
          if (
            group.get('dates.pickUpDate') != undefined &&
            group.get('dates.dropOffDate') != undefined &&
            group.get('dates.pickUpDate').value != '' &&
            group.get('dates.dropOffDate').value != ''
          ) {
            let pickUpTimeParts = group
              .get('times.pickUpTime')
              .value.split(':');
            let dropOffTimeParts = group
              .get('times.dropOffTime')
              .value.split(':');

            let pickUpDateForm = group.get('dates.pickUpDate').value;
            let dropOffDateForm = group.get('dates.dropOffDate').value;
            let pickUpDate = new NgbDate(
              pickUpDateForm.year,
              pickUpDateForm.month,
              pickUpDateForm.day
            );
            let dropoffDate = new NgbDate(
              dropOffDateForm.year,
              dropOffDateForm.month,
              dropOffDateForm.day
            );

            if (dropoffDate.equals(pickUpDate)) {
              if (+dropOffTimeParts[0] < +pickUpTimeParts[0]) {
                return { 'times invalid': true };
              }
            }
          }
        }
      }
    }

    return null;
  }

  ngOnDestroy(){
    this.addressesSubscription.unsubscribe();
  }
}
