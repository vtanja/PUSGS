import { HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../services/user-service.service';
@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private userService: UserService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (localStorage.getItem('token') != undefined) {
      const clonedReq = req.clone({
        headers: req.headers.set(
          'Authorization',
          'Bearer ' + localStorage.getItem('token')
        ),
      });

      return next.handle(clonedReq).pipe(
        tap(
          (succ) => {},
          (err) => {
            this.checkErrorStatus(err);
          }
        )
      );
    } else {
      return next.handle(req.clone()).pipe(
        tap(
          (succ) => {},
          (err) => {
            this.checkErrorStatus(err);
          }
        )
      );
    }
  }

  checkErrorStatus(err: any) {
    if (err.status == 401) {
      this.authenticationFailedAction();
    } else if (err.status == 403) {
      this.authorizationFailedAction();
    } else if (err.status == 0) {
      this.serverUnavailableAction();
    }
  }

  authenticationFailedAction() {
    this.toastr.error(
      'This action requires user to be logged in. Please log in.'
    );
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
    this.userService.userLogged.next(false);
  }

  authorizationFailedAction() {
    this.toastr.error("You don't have persmisson to access this resource.");
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
    this.userService.userLogged.next(false);
  }

  serverUnavailableAction() {
    this.toastr.warning(
      'Server temporarly unavailable.Please try again later.',
      'Action failed.'
    );
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
    this.userService.userLogged.next(false);
  }
}
