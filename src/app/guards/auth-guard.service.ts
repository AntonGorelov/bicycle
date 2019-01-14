import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';

import { JwtService } from '../jwt.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(
    private _jwtService: JwtService,
    private _router: Router
  ) { }

  public canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this._jwtService.loggedIn) {
      return true;
    }

    this._router.navigate(['/login']);
    return false;
  }
}
