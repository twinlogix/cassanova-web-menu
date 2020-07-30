import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivateChild, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '@services/token.service'
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TokenAuthGuard implements CanActivate, CanActivateChild {

  constructor(private token: TokenService, private router: Router) {}

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return this.canActivate(childRoute, state);
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree>
  {
    return this.token.loadToken().pipe(
      map(res => res === false ? this.router.parseUrl('/401') : res)
    )
  }
}
