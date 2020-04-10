import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

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

  // onCarsClick(){
  //   console.log(this.route);
  //   if(this.route.routeConfig.path===''){
  //     this.router.navigate(['home', 'search-cars']);
  //   }
  //   else{
  //     this.router.navigate(['search-cars'], {relativeTo:this.route});
  //   }

  // }

}
