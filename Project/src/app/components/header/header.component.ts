import {
  Component,
  OnInit,
  Input,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { UserService } from '../../services/user-service.service';
import { User } from '../../models/user';
import { Router, NavigationEnd } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Subscription } from 'rxjs';
import { AirlineService } from '../../services/airline.service';
import { Airline } from '../../models/airline.model';
import { AirlineAdministratorService } from '../../services/airline-administrator.service';
import { RentCarService } from '../../services/rent-a-car.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  loggedIn: boolean = false;
  companyExists: boolean;
  airlineExists:boolean;
  userName: string = '';
  userRole: string = '';
  invitations: User[] = [];

  isCollapsedRequests: boolean = true;
  mySubscription: Subscription;
  firstCompanyAdded: Subscription;
  constructor(
    private userService: UserService,
    private airlineService: AirlineService,
    private airlineAdminService: AirlineAdministratorService,
    private rentCarService: RentCarService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.userService.isUserLoggedIn()) {
      this.loggedIn = true;
      this.getUserData();
      // if (this.userService.getUserRole() === 'USER') {
      //   this.invitations = this.getRequests();
      // }
    }

    this.userService.userLogged.subscribe((isLogged: boolean) => {
      if (isLogged) {
        this.getUserData();
        this.loggedIn = true;
        if (this.userService.getUserRole() === 'USER') {
          this.invitations = this.getRequests();
        }
      } else {
        this.loggedIn = false;
        this.userRole = '';
        this.userName = '';
      }
    });

    

    this.rentCarService.firstCompanyAdded.subscribe((addedCompany: boolean) => {
      if (addedCompany) this.companyExists = true;
    });
  }

  onLogoClick() {
    if (!this.userService.isUserLoggedIn()) {
      this.router.navigate(['/home']);
    } else if (this.userService.getUserRole() === 'ADMINISTRATOR')
      this.router.navigate(['/admin-home']);
    else if (this.userService.getUserRole()==='RENTCARADMIN')
      this.router.navigate(['/rent-car-admin-home/chart-bar']);
    else if(this.userService.getUserRole()==='AIRLINEADMIN')
      this.router.navigate(['/airline-admin-home/airline-chart-bar'])
    else this.router.navigate(['/home']);
  }

  onCompanyDataAndDestinations() {
    this.userService.hasAirline().subscribe((res: boolean) => {
      if (res) {
        this.router.navigate(['/airline-company-data/edit-airline-main-data']);
      } else {
        this.router.navigate(['/airline-admin']);
      }
    });
  }

  getRequests(): User[] {
    let requests: User[] = [];
    this.userService.getFriendRequests().subscribe((res: User[]) => {
      res.forEach((obj) => {
        requests.push(obj);
      });
    });
    return requests;
  }

  onAccept(user: User) {
    this.userService.accept(user).subscribe((res: any) => {
      this.invitations = this.getRequests();
      this.userService.newRequest.next(true);
    });
  }

  onDecline(user: User) {
    this.userService.delete(user).subscribe((res: any) => {
      this.invitations = this.getRequests();
    });
  }

  getUserData(): void {
    this.userRole = this.userService.getUserRole();
    if (this.userRole === 'RENTCARADMIN') {
      this.userService.userHasCompany().subscribe((res: any) => {
        this.companyExists = res.hasCompany;
      });
    }
    this.userName = this.userService.getUserName();
  }

  onLogout(): void {
    if (this.userService.logout()) {
      this.router.navigate(['/home']);
    }
  }

  ngOnDestroy() {
    this.mySubscription.unsubscribe();
    this.firstCompanyAdded.unsubscribe();
  }
}
