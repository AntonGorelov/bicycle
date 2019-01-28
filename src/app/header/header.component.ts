import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { JwtService } from '../jwt.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(private _jwtService: JwtService, private _router: Router) {}

  public get loggedIn() {
    return this._jwtService.loggedIn;
  }

  public logout() {
    this._jwtService.logout();
    this._router.navigate(['/login']);
  }
}
