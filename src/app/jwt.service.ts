import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class JwtService {
  constructor(private _httpClient: HttpClient) { }

  public get loggedIn() {
    return localStorage.getItem('access_token') !==  null;
  }

  public login(email: string, password: string) {
    return this._httpClient.post<{access_token:  string}>('http://localhost:3000/users',
      { email, password }).pipe(tap(response => {
      localStorage.setItem('access_token', response.access_token);
    }));
  }

  public logout() {
    localStorage.removeItem('access_token');
  }
}
