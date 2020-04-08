import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-rent-a-car-search',
  templateUrl: './rent-a-car-search.component.html',
  styleUrls: ['./rent-a-car-search.component.css']
})
export class RentACarSearchComponent implements OnInit {

  @Output('formSearchSubmitted')
  formParamsSubmitted = new EventEmitter<{}>();

  searchForm: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      'name' : new FormControl(''),
      'address' : new FormControl(''),
      'rate' : new FormControl('1',[Validators.min(1),Validators.max(5)])
    })
  }

  onSubmitForm(){
    console.log(this.searchForm.get('rate').value);
    const params = {
      'name' : this.searchForm.get('name').value,
      'address' : this.searchForm.get('address').value,
      'rate' : this.searchForm.get('rate').value,

    };

    this.formParamsSubmitted.emit(params);

  }

}
