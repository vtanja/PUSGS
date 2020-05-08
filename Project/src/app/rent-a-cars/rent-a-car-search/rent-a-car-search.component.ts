import { Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { RentCarService } from '../../services/rent-a-car.service';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

export interface LocationGroup {
  letter: string;
  names: string[];
}

export const _filter = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();

  return opt.filter(item => item.toLowerCase().indexOf(filterValue) === 0);
};

@Component({
  selector: 'app-rent-a-car-search',
  templateUrl: './rent-a-car-search.component.html',
  styleUrls: ['./rent-a-car-search.component.css']
})
export class RentACarSearchComponent implements OnInit {

  stateForm: FormGroup = this._formBuilder.group({
    locationGroup: '',
  });

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

  locationOptions: Observable<LocationGroup[]>;

  searchForm: FormGroup;

  constructor(private _formBuilder: FormBuilder,private rentCarService:RentCarService) { }

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      'name' : new FormControl(''),
      'address' : new FormControl(''),
      'rate' : new FormControl('',[Validators.min(1),Validators.max(5)])
    });

    this.locationOptions = this.searchForm.get('address')!.valueChanges
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

  onSubmitForm(){
    console.log(this.searchForm.get('rate').value);
    const params = {
      'name' : this.searchForm.get('name').value,
      'address' : this.searchForm.get('address').value,
      'rate' : this.searchForm.get('rate').value,

    };
    this.rentCarService.searchParamsSubject.next(params);
  }

  onChangeSort(value:string){
    this.rentCarService.sortChange.next(value);
  }

}
