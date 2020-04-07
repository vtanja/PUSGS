import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomePageComponent } from './home-page/home-page.component';
import { RegisterComponent } from './register/register.component';
import { AirlinesComponent } from './airlines/airlines.component';
import { RentACarsComponent } from './rent-a-cars/rent-a-cars.component';
import { UserProfileComponent } from './user-profile/user-profile.component';


const routes: Routes = [
  {path: '', component:HomePageComponent, pathMatch:'full' },
  {path: 'home', component: HomePageComponent, 
    children:[
      {path: 'profile', component:UserProfileComponent}
    ]
  },
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: '1', component:RentACarsComponent},
  {path: '2', component:AirlinesComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
