import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
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
      console.log(event.url);
      document.getElementById('inner2').scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
    });
  }

  ngAfterViewInit(){
    document.getElementById('inner2').scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }

}
