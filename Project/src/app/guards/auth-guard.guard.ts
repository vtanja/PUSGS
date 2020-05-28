localStorage.removeItem('token');import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {

  constructor(private userService:UserService,private router:Router){

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.userService.isUserLoggedIn()){
        let roles = next.data['permittedRoles'] as Array<string>;
        if(roles){
          if(this.userService.roleMatch(roles)){
            return true;
          }
          else{
            localStorage.removeItem('token');
            this.router.navigate(['/login']);
            return false;
          }
        }
        return true;
      }
      else{
        this.router.navigateByUrl('/login');
        return false;
      }
  }

}
