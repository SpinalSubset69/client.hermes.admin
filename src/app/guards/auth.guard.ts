import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate , CanActivateChild{

    isAuthorized:boolean = true;
  constructor(private authService:AuthService, private router:Router){}

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isAuthorized = this.authService.validateUserToken();

    if(!isAuthorized){
      this.router.navigateByUrl('/auth')
    }
    return isAuthorized;
  }

  canActivate(): boolean {
    return this.authService.validateUserToken();
  }
}
