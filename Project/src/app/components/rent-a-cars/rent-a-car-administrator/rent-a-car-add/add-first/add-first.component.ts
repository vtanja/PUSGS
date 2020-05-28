import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-first',
  templateUrl: './add-first.component.html',
  styleUrls: ['./add-first.component.css']
})
export class AddFirstComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }


}
