import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuad implements CanActivate {
  constructor(protected router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    if (localStorage.getItem('token')) {
      return true;
    }
    this.router.navigate(['login'], { queryParams: { 'redirect': state.url } });
    return false;
  }
}
