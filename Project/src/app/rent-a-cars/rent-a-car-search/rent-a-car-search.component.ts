import { Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RentCarService } from '../rent-a-car.service';



@Component({
  selector: 'app-rent-a-car-search',
  templateUrl: './rent-a-car-search.component.html',
  styleUrls: ['./rent-a-car-search.component.css']
})
export class RentACarSearchComponent implements OnInit {

  searchForm: FormGroup;

  constructor(private rentCarService:RentCarService) { }

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
    this.rentCarService.searchParamsSubject.next(params);
  }

}
