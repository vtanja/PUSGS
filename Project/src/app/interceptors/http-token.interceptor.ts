import { HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {HttpRequest,HttpHandler,HttpEvent} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor{

  constructor(private router:Router,private toastr:ToastrService){}

  intercept(req: HttpRequest<any>, next:HttpHandler): Observable<HttpEvent<any>> {

    if(localStorage.getItem('token')!=undefined){

      const clonedReq = req.clone({
        headers:req.headers.set('Authorization','Bearer ' + localStorage.getItem('token'))
      });

      return next.handle(clonedReq).pipe(
        tap(
          succ=> {},
          err => {
            if(err.status == 401){
              localStorage.removeItem('token');
              this.router.navigateByUrl('/login');
            }
          }
        )
      );
    } else{
      return next.handle(req.clone());
    }
  }

}