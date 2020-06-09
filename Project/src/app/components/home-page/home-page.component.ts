import { Component, AfterViewInit } from '@angular/core';
import {  Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements AfterViewInit {

  constructor(private router:Router) {
  }

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      if(document.getElementById('inner2')!=undefined)
        document.getElementById('inner2').scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
    });
  }

  ngAfterViewInit(){
    if(document.getElementById('inner2')!=undefined)
      document.getElementById('inner2').scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }

}
