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
  navbarFirst:string;
  navbarSecond:string;
  navbarThird:string;
  iconFirst:string;
  iconSecond:string;
  iconThird:string;
  hideThird:boolean=true;

  constructor(private router:Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
    if(this.route.snapshot.routeConfig.path==="company-data"){

        this.navbarFirst = 'MAIN DATA';
        this.navbarSecond = 'OFFICES';

        this.iconFirst = "../../assets/images/mainData.png";
        this.iconSecond = "../../assets/images/office.png";

    }
    else if(this.route.snapshot.routeConfig.path==="airline-company-data"){

      this.hideThird=false;
      this.navbarFirst = 'MAIN DATA';
      this.navbarSecond = 'DESTINATIONS';
      this.navbarThird = 'PRICELIST';

      this.iconFirst = "../../assets/images/mainData.png";
      this.iconSecond = "../../assets/images/island.png";
      this.iconThird = "../../assets/images/euro2.svg";

  } else{

      this.navbarFirst = 'CAR RENTALS';
      this.navbarSecond = 'FLIGHTS';

      this.iconFirst = "../../assets/images/car.png";
      this.iconSecond = "../../assets/images/departure.png";
    }
  }

  onFirstItemClick(){
    if(this.route.snapshot.routeConfig.path==="reservations"){
      this.router.navigate(['car-reservations'], {relativeTo:this.route});
    } else if(this.route.snapshot.routeConfig.path==="company-data"){
      this.router.navigate(['edit-main-data'], {relativeTo:this.route});
    }else if(this.route.snapshot.routeConfig.path==="airline-company-data"){
      this.router.navigate(['edit-airline-main-data'], {relativeTo:this.route});
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

  onSecondItemClick(){
    if(this.route.snapshot.routeConfig.path==="reservations"){
      this.router.navigate(['flight-reservations'], {relativeTo:this.route});
    }else if(this.route.snapshot.routeConfig.path==="company-data"){
      this.router.navigate(['edit-offices'], {relativeTo:this.route});
    }else if(this.route.snapshot.routeConfig.path==="airline-company-data"){
      this.router.navigate(['edit-destinations'], {relativeTo:this.route});
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
