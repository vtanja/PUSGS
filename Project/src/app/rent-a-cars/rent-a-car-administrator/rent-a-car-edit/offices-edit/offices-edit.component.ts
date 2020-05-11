import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-offices-edit',
  templateUrl: './offices-edit.component.html',
  styleUrls: ['./offices-edit.component.css']
})
export class OfficesEditComponent implements OnInit {

  @Input('companyId') companyId;

  constructor() { }

  ngOnInit(): void {
  }

}
