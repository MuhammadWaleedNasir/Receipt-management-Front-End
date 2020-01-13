import { HttpInterceptor,HttpRequest,HttpHandler,HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from '@angular/core';
  
@Injectable()

  export class AuthInterceptor implements HttpInterceptor {
    intercept(
      req: HttpRequest<any>,
      next: HttpHandler): Observable<HttpEvent<any>> {
      const token = localStorage.getItem('access-token');
      if(token){
        const cloned = req.clone({
            setHeaders : {
                'Content-Type' : 'application/json; charset=utf-8',
                'Accept'       : 'application/json',
                'Authorization' : `Bearer ${token}`,
            },
            
        });
        return next.handle(cloned);
      }
      else{
          return next.handle(req);
      }
    }
  }