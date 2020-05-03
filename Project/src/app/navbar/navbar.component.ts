import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HomePageComponent } from '../home-page/home-page.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  carActive:boolean=true;

  constructor(private router:Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
  }

  onCarsClick(){
    if(this.route.snapshot.routeConfig.path==="reservations"){
      this.router.navigate(['car-reservations'], {relativeTo:this.route});
    }
    else{
      if(this.route.snapshot.routeConfig.path==="home"){
        this.router.navigate(['search-cars'], {relativeTo:this.route});
      }
      else{
        this.router.navigate(['home', 'search-cars']);
      }
      
    }
  }

  onFlightsClick(){
    if(this.route.snapshot.routeConfig.path==="reservations"){
      this.router.navigate(['flight-reservations'], {relativeTo:this.route});
    }
    else{
      if(this.route.snapshot.routeConfig.path==="home"){
        this.router.navigate(['search-flights'], {relativeTo:this.route});
      }
      else{
        this.router.navigate(['home', 'search-flights']);
      }
      
    }
  }
}
