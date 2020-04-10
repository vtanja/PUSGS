import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomePageComponent } from './home-page/home-page.component';
import { RegisterComponent } from './register/register.component';
import { AirlinesComponent } from './airlines/airlines.component';
import { RentACarsComponent } from './rent-a-cars/rent-a-cars.component';
import { CarsSearchComponent } from './rent-a-cars/cars-search/cars-search.component';
// import { CarsListComponent } from './rent-a-cars/cars/cars-list/cars-list.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { FriendsListComponent } from './user/friends-list/friends-list.component';
import { UserComponent } from './user/user.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CarsComponent } from './rent-a-cars/cars/cars.component';


const routes: Routes = [
  {path: '', component:HomePageComponent, pathMatch:'full'},
  {path: 'home', component: HomePageComponent,
    children:[
      {path: 'search-cars', component:CarsSearchComponent},
    ]},
  {path: 'user', component: UserComponent,
    children:[
      {path: 'search-cars', component:CarsSearchComponent},
    ]},
    {path: 'profile', component:UserProfileComponent},
      {path: 'friends', component:FriendsListComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: '1', component:CarsSearchComponent},
  {path: '2', component:AirlinesComponent},
  {path: 'allCarCompanies',component: RentACarsComponent},
  {path: 'allCars',component: CarsComponent},
  {path: 'navbar', component:NavbarComponent },

];

const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled',
  scrollOffset: [0, 64],
};

@NgModule({
  imports: [RouterModule.forRoot(routes,routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
