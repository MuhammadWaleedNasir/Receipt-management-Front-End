import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
import { Observable } from 'rxjs';

@Injectable()

export class AuthGuard implements CanActivate {
    
    constructor(private authService : AuthServiceService,
                private router : Router){}
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean> | boolean{
         
        let login = localStorage.getItem('access-token');
        if(login){
            this.authService.isLoggedInActive(true);
            return true;
        }
        else{
            this.authService.isLoggedInActive(false);
            this.router.navigate(['/login']);
            return false;
       }
    }
}