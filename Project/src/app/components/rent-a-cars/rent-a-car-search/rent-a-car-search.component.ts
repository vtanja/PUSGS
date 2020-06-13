import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  ValidationErrors,
} from '@angular/forms';
import { RentCarService } from '../../../services/rent-a-car.service';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { AppDataService } from 'src/app/services/app-data.service';

export interface LocationGroup {
  letter: string;
  names: string[];
}

export const _filter = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();

  return opt.filter((item) => item.toLowerCase().indexOf(filterValue) === 0);
};

@Component({
  selector: 'app-rent-a-car-search',
  templateUrl: './rent-a-car-search.component.html',
  styleUrls: ['./rent-a-car-search.component.css'],
})
export class RentACarSearchComponent implements OnInit {
  locationOptions: Observable<string[]>;
  options: string[];
  searchForm: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private rentCarService: RentCarService,
    private appDataService: AppDataService
  ) {}

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      name: new FormControl(''),
      address: new FormControl(''),
      rate: new FormControl('', [Validators.min(1), Validators.max(5)]),
    });

    this.locationOptions = this.searchForm.get('address')!.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );

    this.options = this.appDataService.Locations;
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  onSubmitForm() {
    if (!this.isFormEmpty()) {
      const params =
        'name=' +
        this.searchForm.get('name').value +
        '&address=' +
        this.searchForm.get('address').value +
        '&rate=' +
        (this.searchForm.get('rate').value === ''
          ? -1
          : +this.searchForm.get('rate'));

      this.rentCarService.searchParamsSubject.next(params);
    }
  }

  onChangeSort(value: string) {
    this.rentCarService.sortChange.next(value);
  }

  private requireMatch(control: FormControl): ValidationErrors | null {
    const selection: string = control.value;

    if (selection != undefined && selection != '') {
      if (this.options.indexOf(selection) < 0) {
        return { requireMatch: true };
      }
      return null;
    }
  }

  isFormEmpty(): boolean {
    if (
      this.searchForm.get('name').value.trim() === '' &&
      this.searchForm.get('address').value.trim() === '' &&
      this.searchForm.get('rate').value.trim() === ''
    )
      return true;
    return false;
  }
}
